export function formatShortDescription(description: string): string {
  const idx = description.indexOf('.');
  return idx >= 0 ? description.slice(0, idx + 1) : description;
}
