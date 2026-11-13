const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
(async () => {
  const root = path.resolve(__dirname, "..");
  const config = JSON.parse(fs.readFileSync(path.join(root, "dist/server/wrangler.json"), "utf8"));
  assert.equal(config.name, "sadhyastore");
  assert.equal(config.vars.STORE_API_ORIGIN, "https://sadhya-api.onrender.com");
  const worker = (await import(pathToFileURL(path.join(root, "dist/server/index.js")).href))
    .default;
  const nativeFetch = global.fetch;
  try {
    let seen;
    global.fetch = async (request, options) => {
      const outbound = new Request(request, options);
      seen = {
        url: outbound.url,
        method: outbound.method,
        headers: outbound.headers,
        body: outbound.method === "GET" ? null : await outbound.text(),
        redirect: outbound.redirect,
      };
      return Response.json(
        { status: "ok" },
        { headers: { "Set-Cookie": "test=value; Secure; HttpOnly" } },
      );
    };
    const env = { ...config.vars, STORE_API_TOKEN: "test-gateway-token" };
    let result = await worker.fetch(
      new Request("https://www.sadhyasnackboxnutz.com/api/health"),
      env,
      {},
    );
    assert.equal(result.status, 200);
    assert.equal((await result.json()).status, "ok");
    assert.equal(seen.url, "https://sadhya-api.onrender.com/api/health");
    assert.equal(result.headers.get("Cache-Control"), "no-store");
    assert.match(result.headers.get("Set-Cookie"), /Secure/);
    result = await worker.fetch(
      new Request("https://www.sadhyasnackboxnutz.com/api/auth/login?test=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Sadhya-Gateway-Key": "spoofed",
          "X-Sadhya-Client-IP": "spoofed",
          "CF-Connecting-IP": "203.0.113.1",
          Cookie: "session=test",
          "X-CSRF-TOKEN": "test-csrf",
        },
        body: JSON.stringify({ identifier: "test@example.com", password: "not-a-real-password" }),
      }),
      env,
      {},
    );
    assert.equal(result.status, 200);
    assert.equal(seen.url, "https://sadhya-api.onrender.com/api/auth/login?test=1");
    assert.equal(seen.method, "POST");
    assert.equal(JSON.parse(seen.body).identifier, "test@example.com");
    assert.equal(seen.headers.get("X-Sadhya-Gateway-Key"), "test-gateway-token");
    assert.equal(seen.headers.get("X-Sadhya-Client-IP"), "203.0.113.1");
    assert.equal(seen.headers.get("Cookie"), "session=test");
    assert.equal(seen.headers.get("X-CSRF-TOKEN"), "test-csrf");
    assert.equal(seen.redirect, "manual");
    assert.equal(
      (await worker.fetch(new Request("https://store.example/api/health"), {}, {})).status,
      503,
    );
    console.log(
      "PASS: built Worker targets sadhyastore, includes origin binding, proxies API GET/POST bodies, forwards cookies/CSRF, overwrites spoofed gateway headers and avoids React routing",
    );
  } finally {
    global.fetch = nativeFetch;
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
