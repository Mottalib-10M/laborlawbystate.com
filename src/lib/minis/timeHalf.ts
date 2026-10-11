/** Time and a half and double time of an hourly rate, and the pay for a number of overtime hours. */
import type { MiniSpec } from '../mini-types';
import { timeAndHalf, doubleTime } from '../engine/overtime';
import { P, usd, rate$ } from './_kit';
export default (): MiniSpec => ({
  title: 'Time and a half on your rate',
  cta: 'Overtime rules by state', ctaHref: '/en/overtime-laws-by-state/',
  inputs: [{ id: 'r', label: 'Regular hourly rate', def: 18, unit: '$', max: 500, decimals: 2 }, { id: 'o', label: 'Overtime hours this week', def: 6, unit: 'h', max: 80, decimals: 1 }],
  run: (v) => ({ head: ['Time and a half', `${rate$(timeAndHalf(v.r))}/h`], rows: [['Overtime pay for these hours', usd(timeAndHalf(v.r) * v.o)], ['Extra over straight time', usd((timeAndHalf(v.r) - v.r) * v.o)], ['Double time (where a state requires it)', `${rate$(doubleTime(v.r))}/h`], [`Week of ${P.federal.otWeeklyHours} h + overtime`, usd(v.r * P.federal.otWeeklyHours + timeAndHalf(v.r) * v.o)]] }),
});
