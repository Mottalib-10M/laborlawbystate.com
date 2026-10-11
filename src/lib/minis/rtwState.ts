/** Right to work: can a union contract require a fee in your state, and what dues cost over a year. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { usd, parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'Right to work in your state',
    cta: 'All state labor laws', ctaHref: '/en/states/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'Michigan'), options: opts(a.rows) }, { id: 'd', label: 'Union dues per month', def: 50, unit: '$', max: 2000, decimals: 2 }],
    run: (v) => {
      const r = a.rows[v.s]; if (!r) return { head: ['Right to work', '–'], rows: [] };
      if (r[13] < 0) return { head: [r[0], 'Not confirmed here'], rows: [['Status', 'See the state labor agency'], ['Dues over a year', usd(v.d * 12)]] };
      return { head: [r[0], r[13] ? 'Right-to-work state' : 'No right-to-work law'], rows: [['Can a contract require a fee?', r[13] ? 'No' : 'Yes, for workers it covers'], ['Dues over a year', usd(v.d * 12)], ['Public sector', 'Janus (2018): no fee can be required']] };
    },
  };
};
