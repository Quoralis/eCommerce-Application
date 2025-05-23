export function formatPrice(cents: number, currency = '€'): string {
  const value = (cents / 100).toFixed(2);
  return `${value.toString()} ${currency}`;
}
