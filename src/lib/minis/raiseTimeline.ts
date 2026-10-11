/** What the 2026 and announced 2027 changes are worth for one worker in a state. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { P, usd, rate$, parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'What the minimum wage raise is worth to you',
    cta: 'See every state rate', ctaHref: '/en/minimum-wage-by-state/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'Michigan'), options: opts(a.rows) }, { id: 'h', label: 'Hours per week', def: 30, unit: 'h', max: 80, decimals: 1 }],
    run: (v) => {
      const r = a.rows[v.s]; if (!r) return { head: ['Raise', '–'], rows: [] };
      const now = r[1], jan = Math.max(r[17], P.federal.minWage), next = r[16];
      const y = (x: number) => x * v.h * 52;
      return {
        head: [next ? `Next rate in ${r[0]}` : `Rate in ${r[0]} now`, next ? rate$(next) : rate$(now)],
        rows: [['Rate on January 1, 2026', rate$(jan)], ['Rate in force now', rate$(now)], ['Extra pay a year since January', usd(Math.max(0, y(now - jan)))], ...(next ? [['Extra pay a year at the next rate', usd(Math.max(0, y(next - now)))] as [string, string]] : [['Next change', 'none announced'] as [string, string]])],
      };
    },
  };
};
