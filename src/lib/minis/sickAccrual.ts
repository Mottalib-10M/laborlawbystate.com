/** Paid sick leave earned in a year under the state rule. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { sickAccrual, weeksToEarn } from '../engine/leave';
import { num, parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'Sick leave you earn in a year',
    cta: 'Your state page', ctaHref: '/en/states/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'Illinois'), options: opts(a.rows) }, { id: 'h', label: 'Hours per week', def: 30, unit: 'h', max: 80, decimals: 1 }],
    run: (v) => {
      const r = a.rows[v.s]; if (!r) return { head: ['Sick leave', '–'], rows: [] };
      if (!r[4]) return { head: [r[0], 'No statewide law'], rows: [['Leave', 'Employer policy or city ordinance'], ['Federal law', 'No paid sick leave requirement']] };
      const x = sickAccrual(v.h, 52, r[4], r[5]);
      return { head: ['Hours earned in a year', num(Math.floor(x.accrued))], rows: [['Rate', `1 hour per ${r[4]} hours worked`], ['Cap (typical employer)', r[5] != null ? `${r[5]} hours` : 'none stated'], ['Weeks to earn one 8-hour day', num(weeksToEarn(8, v.h, r[4]), 1)]] };
    },
  };
};
