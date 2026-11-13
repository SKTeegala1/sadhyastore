// Evaluate only the repository's trusted catalog modules, replacing image imports
// with their stable public paths so the API smoke test can verify real seed data.
const ts = require("typescript");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
function source(file) {
  return ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
}
const catalog = {
  exports: {},
  require: (image) => ({ default: "/catalog/" + image.split("/").pop() }),
};
vm.runInNewContext(source("src/data/products.ts"), catalog);
const seed = { exports: {} };
vm.runInNewContext(source("src/lib/catalogSeed.ts"), seed);
process.stdout.write(JSON.stringify(seed.exports.prepareCatalogImport(catalog.exports.PRODUCTS)));
