/** A city's own minimum wage against its state's rate. arg: { cities: Array<[label, cityRate, stateName, stateRate]> } */
import type { MiniSpec } from '../mini-types';
import { usd, rate$, parseArg } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ cities: Array<[string, number, string, number]> }>(arg, { cities: [] });
  return {
    title: 'City minimum wage against the state rate',
    cta: 'Minimum wage calculator', ctaHref: '/en/minimum-wage-by-state/',
    inputs: [{ id: 'c', label: 'City or county', def: 0, options: a.cities.map((c, i) => ({ value: String(i), label: c[0] })) }, { id: 'h', label: 'Hours per week', def: 40, unit: 'h', max: 80, decimals: 1 }],
    run: (v) => {
      const c = a.cities[v.c]; if (!c) return { head: ['City rate', '–'], rows: [] };
      return { head: [`${c[0]}, per hour`, rate$(c[1])], rows: [[`${c[2]} state rate`, rate$(c[3])], ['Difference per hour', rate$(c[1] - c[3])], ['Difference over a year', usd((c[1] - c[3]) * v.h * 52)], ['Year at the city rate', usd(c[1] * v.h * 52)]] };
    },
  };
};
