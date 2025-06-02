export function keepOnlyDigits(str: string): string {
  if (!str) return '';
  return str.replace(/\D/g, '');
}
