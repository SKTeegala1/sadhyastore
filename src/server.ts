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
        const origin = (env as { STORE_API_ORIGIN?: string } | undefined)?.STORE_API_ORIGIN;
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
        headers.delete("x-forwarded-for");
        headers.delete("x-forwarded-host");
        headers.set("x-forwarded-proto", "https");
        try {
          const response = await fetch(
            new Request(upstream, {
              method: request.method,
              headers,
              body: request.body,
              redirect: "manual",
            }),
          );
          const result = new Response(response.body, response);
          result.headers.set("Cache-Control", "no-store");
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
