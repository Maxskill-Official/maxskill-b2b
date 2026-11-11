export function withoutCorporationMarker(name: string) {
  return name
    .replace(/\s*(?:\(주\)|㈜)\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}
