import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (new URL(request.url).pathname.startsWith("/api/")) {
        const bindings = env as { STORE_API_ORIGIN?: string; STORE_API_TOKEN?: string } | undefined;
        const origin = bindings?.STORE_API_ORIGIN;
        if (!origin)
          return Response.json(
            { message: "The store API has not been configured." },
            { status: 503 },
          );
        const upstream = new URL(origin);
        if (upstream.protocol !== "https:")
          return Response.json({ message: "The store API requires HTTPS." }, { status: 503 });
        const incoming = new URL(request.url);
        upstream.pathname = incoming.pathname;
        upstream.search = incoming.search;
        const headers = new Headers(request.headers);
        headers.delete("host");
        headers.delete("x-sadhya-gateway-key");
        headers.delete("x-sadhya-client-ip");
        if (bindings?.STORE_API_TOKEN)
          headers.set("X-Sadhya-Gateway-Key", bindings.STORE_API_TOKEN);
        const clientIp = request.headers.get("CF-Connecting-IP");
        if (clientIp) headers.set("X-Sadhya-Client-IP", clientIp);
        headers.delete("x-forwarded-for");
        headers.delete("x-forwarded-host");
        headers.set("x-forwarded-proto", "https");
        const publicMedia = request.method === "GET" && /^\/api\/media\/[0-9a-f-]{36}$/i.test(incoming.pathname)
          && [...incoming.searchParams.keys()].every(key => key === "w")
          && (!incoming.searchParams.has("w") || /^(160|400|900|1600)$/.test(incoming.searchParams.get("w")!));
        const edgeCache = (globalThis as unknown as { caches?: { default?: { match: (key: Request) => Promise<Response | undefined>; put: (key: Request, value: Response) => Promise<void> } } }).caches?.default;
        const cacheKey = new Request(incoming.toString());
        if (publicMedia && edgeCache) {
          const cached = await edgeCache.match(cacheKey);
          if (cached) return cached;
          // Media IDs are public and immutable; never forward customer credentials.
          headers.delete("cookie");
          headers.delete("authorization");
        }
        try {
          const response = await fetch(new Request(upstream, request), {
            headers,
            redirect: "manual",
          });
          const result = new Response(response.body, response);
          if (publicMedia && result.status === 200 && result.headers.get("Content-Type")?.startsWith("image/") && !result.headers.has("Set-Cookie")) {
            result.headers.set("Cache-Control", "public, max-age=31536000, immutable");
            if (edgeCache) {
              const pending = edgeCache.put(cacheKey, result.clone()).catch(() => {});
              const context = ctx as { waitUntil?: (task: Promise<unknown>) => void };
              if (context?.waitUntil) context.waitUntil(pending);
              else await pending;
            }
          } else result.headers.set("Cache-Control", "no-store");
          return result;
        } catch {
          return Response.json(
            { message: "The store server is temporarily unavailable." },
            { status: 503 },
          );
        }
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
