/** Paid family leave: does the state run a program, and what a week at the maximum benefit adds up to. arg: { rows: [name, weeks|null, maxWeekly|null, programName|null][] , first } */
import type { MiniSpec } from '../mini-types';
import { usd, parseArg } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Array<[string, number | null, number | null, string | null]>; first?: string }>(arg, { rows: [] });
  const first = Math.max(0, a.rows.findIndex((r) => r[0] === (a.first ?? 'New York')));
  return {
    title: 'Paid family leave in your state',
    cta: 'FMLA eligibility and weeks left', ctaHref: '/en/fmla/',
    inputs: [{ id: 's', label: 'State', def: first, options: a.rows.map((r, i) => ({ value: String(i), label: r[0] })) }, { id: 'w', label: 'Weeks of leave you plan', def: 8, unit: 'weeks', max: 52 }],
    run: (v) => {
      const r = a.rows[v.s]; if (!r) return { head: ['Program', '–'], rows: [] };
      if (!r[3]) return { head: [`${r[0]}`, 'No paid program'], rows: [['Job protection', 'FMLA if eligible (unpaid)'], ['Pay during leave', 'Only PTO or employer plan']] };
      const weeks = r[1] != null ? Math.min(v.w, r[1]) : v.w;
      return { head: [r[3], r[1] != null ? `Up to ${r[1]} weeks` : 'Paid leave'], rows: [['Weeks payable from your plan', String(weeks)], ...(r[2] ? [['Maximum weekly benefit 2026', usd(r[2], 2)] as [string, string], ['Most you could receive', usd(r[2] * weeks)] as [string, string]] : [])], note: 'Your benefit is a share of your own wages, up to the maximum.' };
    },
  };
};
