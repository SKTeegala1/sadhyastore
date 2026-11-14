import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
const manifest = {};
await mkdir('public/optimized', { recursive: true });
for (const folder of ['catalog', 'slides']) {
  for (const name of await readdir(`public/${folder}`)) {
    if (!/\.(png|jpe?g|webp)$/i.test(name)) continue;
    const data = await readFile(`public/${folder}/${name}`);
    const hash = createHash('sha256').update(data).digest('hex').slice(0, 16);
    const variants = {};
    for (const width of [160, 400, 900, 1600]) {
      const url = `/optimized/${hash}-${width}.webp`;
      await sharp(data).rotate().resize({ width, height: width, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public${url}`);
      variants[width] = url;
    }
    manifest[`/${folder}/${name}`] = variants;
  }
}
await writeFile('src/lib/media-manifest.json', JSON.stringify(manifest));
console.log(`Optimized ${Object.keys(manifest).length} catalogue and slide images`);
