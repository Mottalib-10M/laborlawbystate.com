/** Full time or part time: what a weekly schedule triggers under federal rules. */
import type { MiniSpec } from '../mini-types';
import { schedule } from '../engine/hours';
import { P, num } from './_kit';
const R = { acaWeekly: P.aca.fullTimeWeekly, acaMonthly: P.aca.fullTimeMonthly, fmlaHours: P.fmla.hours, otWeekly: P.federal.otWeeklyHours };
export const fullTimeSpec = (title: string, def: number, cta: string, ctaHref: string): MiniSpec => ({
  title, cta, ctaHref,
  inputs: [{ id: 'h', label: 'Hours per week', def, unit: 'h', max: 100, decimals: 1 }],
  run: (v) => {
    const s = schedule(R, v.h);
    return { head: ['Full time for employer health coverage (ACA)', s.acaFullTime ? 'Yes' : 'No'], rows: [['Hours per month (average)', num(s.monthly, 1)], ['Hours per year', num(s.yearly)], ['FMLA hours test', s.fmlaHours ? 'Met' : 'Not met'], ['Overtime hours (over 40)', num(s.overtimeHours, 1)], ['Full-time equivalent (40 h)', num(s.fte, 2)]], note: 'Federal law has no general definition of full time; these are the thresholds that change something.' };
  },
});
export default (): MiniSpec => fullTimeSpec('Is your schedule full time?', 32, 'Part-time hours', '/en/how-many-hours-is-part-time/');
