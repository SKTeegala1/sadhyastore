const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
function load(name) {
  const exports = {};
  const compiled = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "../src/lib", name + ".ts"), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText;
  vm.runInNewContext(compiled, { exports });
  return exports;
}
const { loginDestination } = load("loginDestination");
for (const value of [
  undefined,
  null,
  "/",
  "//other.example",
  "https://other.example",
  "/missing",
  { next: "/admin" },
])
  assert.equal(loginDestination(value), "/");
for (const value of ["/checkout", "/admin", "/account"])
  assert.equal(loginDestination(value), value);
const { relatedProducts } = load("recommendations");
const products = [
  { id: "current", categoryId: 1, stockQuantity: 4 },
  { id: "other", categoryId: 2, stockQuantity: 4 },
  { id: "same-sold-out", categoryId: 1, stockQuantity: 0 },
  { id: "same-stocked", categoryId: 1, stockQuantity: 2 },
  { id: "hidden", categoryId: 1, stockQuantity: 3, isActive: false },
  { id: "featured", categoryId: 2, stockQuantity: 3, isBestSeller: true },
];
assert.equal(
  Array.from(relatedProducts(products, { categoryId: 1, productId: "current" }), (p) => p.id).join(
    ",",
  ),
  "same-stocked,same-sold-out,featured,other",
);
const crossCategory = relatedProducts(products, {
  categoryId: 1,
  excludeIds: ["current", "same-stocked", "same-sold-out"],
});
assert.equal(Array.from(crossCategory, (p) => p.id).join(","), "featured,other");
assert.equal(products[0].id, "current");
assert.equal(relatedProducts([], {}).length, 0);
console.log(
  "PASS: home login default, allowed return destinations, unsafe redirect rejection, related-product ranking/exclusion/visibility and no catalog mutation",
);
