export function parseError(msg: string) {
  const index = msg.indexOf('{');
  if (index) return JSON.parse(msg.slice(index));
}
