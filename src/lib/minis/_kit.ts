/**
 * Shared tools for the mini-simulators (ignored by the registry: "_" prefix).
 * RULE: a mini never imports src/lib/kit.ts (eager loader of the 51 state files would ship to the browser).
 * It may import src/data/params-2026.json and the engines. State figures arrive through `arg`
 * (JSON written by the page from the data with the kit, see `stateArg` in src/lib/mini-args.ts).
 */
import { formatMoney, formatNumber } from '../format';
import P from '../../data/params-2026.json';
export { P };
export const usd = (x: number, d = 0) => formatMoney(x, d);
export const rate$ = (x: number) => formatMoney(x, 2);
export const num = (x: number, d = 0) => formatNumber(x, d);
export const yesNo = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
export function parseArg<T>(arg: string | undefined, fallback: T): T {
  if (!arg) return fallback;
  try { return JSON.parse(arg) as T; } catch { return fallback; }
}
/** Compact row per state passed by pages: [name, minimum wage now, tipped cash or null, tip credit allowed (0/1), sick per-hours or null, sick cap or null, pfl weeks or null, final pay text when fired, pto rule, meal min, meal after h, rest min, rest per h, right to work (1 yes, 0 no, -1 not confirmed), exempt weekly or null, firedDays or null, 2027 rate or null, January rate]. */
export type Row = [string, number, number | null, number, number | null, number | null, number | null, string, string, number | null, number | null, number | null, number | null, number, number | null, number | null, number | null, number];
export const opts = (rows: Row[]) => rows.map((r, i) => ({ value: String(i), label: r[0] }));
export const pick = (rows: Row[], name: string) => Math.max(0, rows.findIndex((r) => r[0] === name));
