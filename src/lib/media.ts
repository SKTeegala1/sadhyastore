import manifest from "./media-manifest.json";
/** Use build-generated variants for bundled assets and sized paths for public uploads. */
export function mediaUrl(source: string, width: 160 | 400 | 900 | 1600): string {
  const variants = (manifest as Record<string, Record<string, string>>)[source];
  if (variants) return variants[width];
  if (!/^\/api\/media\/[0-9a-f-]{36}(?:\?.*)?$/i.test(source)) return source;
  return `${source.split("?")[0]}?w=${width}`;
}
