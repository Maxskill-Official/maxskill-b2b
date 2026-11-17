export function withoutCorporationMarker(name: string) {
  return name
    .replace(/\s*(?:\(주\)|㈜|주식회사)\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}
