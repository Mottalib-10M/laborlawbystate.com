/** Two states side by side for one full-time worker at the minimum wage. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { earnings } from '../engine/wage';
import { usd, rate$, parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[] }>(arg, { rows: [] });
  return {
    title: 'Compare two states for a full-time minimum wage job',
    cta: 'Minimum wage in every state', ctaHref: '/en/minimum-wage-by-state/',
    inputs: [{ id: 'a', label: 'First state', def: pick(a.rows, 'Texas'), options: opts(a.rows) }, { id: 'b', label: 'Second state', def: pick(a.rows, 'California'), options: opts(a.rows) }],
    run: (v) => {
      const A = a.rows[v.a], B = a.rows[v.b];
      if (!A || !B) return { head: ['Minimum wage', '–'], rows: [] };
      const ea = earnings(A[1], 40).annual, eb = earnings(B[1], 40).annual;
      return { head: [`${A[0]} / ${B[0]}, per hour`, `${rate$(A[1])} / ${rate$(B[1])}`], rows: [['Full-time year (2,080 h)', `${usd(ea)} / ${usd(eb)}`], ['Gap over a year', usd(Math.abs(eb - ea))], ['Paid sick leave law', `${A[4] ? 'yes' : 'no'} / ${B[4] ? 'yes' : 'no'}`], ['Paid family leave program', `${A[6] ? 'yes' : 'no'} / ${B[6] ? 'yes' : 'no'}`]] };
    },
  };
};
