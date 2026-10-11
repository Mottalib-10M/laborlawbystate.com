/** Federal cap on a wage garnishment for ordinary debts (CCPA, DOL Fact Sheet #30). */
import type { MiniSpec } from '../mini-types';
import { garnishCap } from '../engine/money';
import { P, usd } from './_kit';
export default (): MiniSpec => ({
  title: 'How much of your pay can be garnished?',
  cta: 'Minimum wage by state', ctaHref: '/en/minimum-wage-by-state/',
  inputs: [{ id: 'd', label: 'Disposable earnings per week', def: 600, unit: '$', max: 100000, decimals: 2 }],
  run: (v) => {
    const g = garnishCap(v.d, P.federal.minWage, P.federal.garnishMultiple, P.federal.garnishPct);
    return { head: ['Most that can be taken each week', usd(g.max, 2)], rows: [[`${P.federal.garnishPct}% of disposable earnings`, usd(g.byPct, 2)], [`Amount above ${P.federal.garnishMultiple} x ${usd(P.federal.minWage, 2)}`, usd(g.byFloor, 2)], ['Fully protected below', usd(g.floor, 2)]], note: 'Ordinary debts only. Child support, taxes and student loans follow other limits; some states protect more.' };
  },
});
