/** Severance from a company formula (weeks per year of service): no federal or state law requires it in general. */
import type { MiniSpec } from '../mini-types';
import { severance } from '../engine/money';
import { usd, num } from './_kit';
export default (): MiniSpec => ({
  title: 'Severance under your employer formula',
  cta: 'Final paycheck rules', ctaHref: '/en/final-paycheck-laws-by-state/',
  inputs: [{ id: 'p', label: 'Annual salary', def: 60000, unit: '$', max: 5000000 }, { id: 'y', label: 'Years of service', def: 6, unit: 'years', max: 60, decimals: 1 }, { id: 'w', label: 'Weeks of pay per year (policy)', def: 2, unit: 'weeks', max: 12, decimals: 1 }],
  run: (v) => {
    const s = severance(v.p / 52, v.y, v.w);
    return { head: ['Severance before taxes', usd(s.amount)], rows: [['Weeks of pay', num(s.weeks, 1)], ['Weekly pay', usd(v.p / 52)], ['If the policy pays 1 week a year', usd(severance(v.p / 52, v.y, 1).amount)]], note: 'Severance is paid only if a contract, policy or agreement promises it. It is taxed as wages.' };
  },
});
