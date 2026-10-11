/** Date arithmetic on ISO dates (UTC, no time zone drift). */
export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10);
}
export function daysBetween(a: string, b: string): number { return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000); }
export const weekday = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
/** Adds working days (Monday to Friday; public holidays are not modeled). */
export function addBusinessDays(iso: string, days: number): string {
  let d = iso, n = 0;
  while (n < days) { d = addDays(d, 1); const w = new Date(`${d}T00:00:00Z`).getUTCDay(); if (w !== 0 && w !== 6) n++; }
  return d;
}
/** True when a final-pay rule counts business or working days. */
export const countsBusinessDays = (rule: string) => /business day|working day|work day/i.test(rule);
