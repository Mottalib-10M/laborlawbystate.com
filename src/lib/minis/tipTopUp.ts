/** Tipped worker: does cash wage plus tips reach the minimum, and how much the employer must add. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { tipTopUp } from '../engine/wage';
import { P, rate$, usd, parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'Do your tips cover the minimum wage?',
    cta: 'Minimum wage by state', ctaHref: '/en/minimum-wage-by-state/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'Texas'), options: opts(a.rows) }, { id: 't', label: 'Tips per hour (average)', def: 4, unit: '$', max: 200, decimals: 2 }],
    run: (v) => {
      const r = a.rows[v.s]; if (!r) return { head: ['Top-up', '–'], rows: [] };
      if (!r[3]) return { head: [`${r[0]}: no tip credit`, `${rate$(r[1])}/h`], rows: [['Cash wage before tips', rate$(r[1])], ['Tips', 'on top of the full minimum'], ['Hourly with tips', rate$(r[1] + v.t)]] };
      const cash = r[2] ?? P.federal.tippedCash;
      const x = tipTopUp(cash, v.t, r[1]);
      return { head: ['Employer top-up owed per hour', rate$(x.topUp)], rows: [['Cash wage', rate$(cash)], ['Cash wage + tips', rate$(x.total)], [`Minimum wage in ${r[0]}`, rate$(r[1])], ['Top-up over a 30-hour week', usd(x.topUp * 30)]] };
    },
  };
};
