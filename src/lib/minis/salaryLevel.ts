/** Hourly equivalent of a salary at the exemption level, and how many hours a week before it falls under the minimum wage. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { P, usd, rate$, num, parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'The exempt salary level in your state, as an hourly rate',
    cta: 'Exempt vs non-exempt', ctaHref: '/en/exempt-vs-non-exempt/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'Washington'), options: opts(a.rows) }, { id: 'h', label: 'Hours you work a week', def: 50, unit: 'h', max: 100, decimals: 1 }],
    run: (v) => {
      const r = a.rows[v.s]; const lvl = Math.max(P.federal.exemptWeekly, r?.[14] ?? 0);
      return { head: [`Exempt level in ${r?.[0] ?? 'your state'}`, `${usd(lvl * 52)} a year`], rows: [['Per week', usd(lvl, 2)], [`Hourly at ${num(v.h, 1)} h a week`, rate$(lvl / Math.max(1, v.h))], ['Federal level', `${usd(P.federal.exemptWeekly)} a week`], ['Highly compensated (federal)', usd(P.federal.hceAnnual)]] };
    },
  };
};
