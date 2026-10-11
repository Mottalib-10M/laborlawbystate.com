/** FMLA hours test: hours in the last 12 months from a usual weekly schedule, against 1,250. */
import type { MiniSpec } from '../mini-types';
import { P, num } from './_kit';
export default (): MiniSpec => ({
  title: 'Do you reach the FMLA hours test?',
  cta: 'Full FMLA eligibility check', ctaHref: '/en/fmla/',
  inputs: [{ id: 'h', label: 'Usual hours per week', def: 25, unit: 'h', max: 100, decimals: 1 }, { id: 'w', label: 'Weeks worked in the last 12 months', def: 50, unit: 'weeks', max: 52 }],
  run: (v) => {
    const total = v.h * v.w, need = P.fmla.hours;
    return { head: ['Hours in the last 12 months', num(total)], rows: [['FMLA test', total >= need ? 'Met' : `${num(need - total)} hours short`], [`Weekly average needed over 52 weeks`, `${num(need / 52, 1)} h`], ['Other tests', `${P.fmla.months} months, ${P.fmla.worksiteEmployees} employees within ${P.fmla.radiusMiles} miles`]], note: 'Only hours actually worked count; paid vacation and holidays do not.' };
  },
});
