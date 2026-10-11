/** Client-side helpers shared by the calculators (no server data). */
import { overtime, type OtRule } from '../../lib/engine/overtime';
import type { ClientState } from './client-types';
export const ruleFor = (s: ClientState, rate: number): OtRule => (s.otDailyBelow != null && rate >= s.otDailyBelow ? { ...s.ot, daily: null } : s.ot);
export const otFor = (s: ClientState, rate: number, hoursPerDay: number, days: number) => overtime(ruleFor(s, rate), { rate, hoursPerDay, daysPerWeek: days });
export function ruleText(s: ClientState): string {
  const r = s.ot; const parts: string[] = [];
  if (r.daily != null) parts.push(`after ${r.daily} hours in a day`);
  parts.push(`after ${Math.min(r.weekly ?? 40, 40)} hours in a week${r.weekly == null || r.weekly > 40 ? ' (federal rule)' : ''}`);
  let t = `Time and a half ${parts.join(' or ')}`;
  if (r.dailyDouble != null) t += `; double time after ${r.dailyDouble} hours in a day`;
  if (r.seventhDay) t += '; 7th consecutive day rule';
  if (s.otDailyBelow != null) t += ' (daily rule only below 1.5 x the minimum wage)';
  return t;
}
export const ptoText = (p: string) => (p === 'required' ? 'Accrued vacation must be paid out' : p === 'policy' ? 'Paid out if the employer policy or contract says so' : 'No state rule: the employer policy decides');
export const stateOptions = (list: ClientState[]) => list.map((s) => ({ value: s.slug, label: s.name }));
