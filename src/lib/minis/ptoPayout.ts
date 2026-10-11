/** Unused vacation at the end of a job: what the state rule says and what the balance is worth. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { usd, parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'Is your unused PTO paid out?',
    cta: 'Final paycheck deadline', ctaHref: '/en/final-paycheck-laws-by-state/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'Colorado'), options: opts(a.rows) }, { id: 'h', label: 'Unused vacation hours', def: 40, unit: 'h', max: 2000, decimals: 1 }, { id: 'r', label: 'Hourly rate', def: 22, unit: '$', max: 500, decimals: 2 }],
    run: (v) => {
      const r = a.rows[v.s]; const rule = r?.[8] ?? 'no-law';
      const verdict = rule === 'required' ? 'Must be paid' : rule === 'policy' ? 'Depends on the written policy' : 'No state rule';
      return { head: [`${r?.[0] ?? ''}: payout`, verdict], rows: [['Value of the balance', usd(v.h * v.r)], ['When it is due', r ? r[7] : '–']] };
    },
  };
};
