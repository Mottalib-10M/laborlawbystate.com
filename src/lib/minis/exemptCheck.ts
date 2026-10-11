/** Salary-level test of the exemption, with the state's own level where it is higher. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { salaryTest } from '../engine/exempt';
import { P, usd, parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'Does your salary pass the exemption test?',
    cta: 'Overtime rules by state', ctaHref: '/en/overtime-laws-by-state/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'California'), options: opts(a.rows) }, { id: 'y', label: 'Annual salary', def: 60000, unit: '$', max: 5000000 }],
    run: (v) => {
      const r = a.rows[v.s]; const t = salaryTest(v.y / 52, P.federal.exemptWeekly, r?.[14] ?? null);
      return { head: ['Salary test', t.passes ? 'Passes' : 'Fails: overtime is owed'], rows: [['Your weekly salary', usd(v.y / 52)], [t.stateHigher ? `Level in ${r?.[0]}` : 'Federal level', `${usd(t.level, 2)} a week`], ['Same level per year', usd(t.annualLevel)], ['Short by (per year)', usd(t.gap * 52)]], note: 'Passing the salary test is not enough: the job duties must also be exempt.' };
    },
  };
};
