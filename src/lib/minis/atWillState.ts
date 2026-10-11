/** Let go tomorrow: what at-will means in practice in a state (final pay rule, vacation). arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'If you were let go today',
    cta: 'Final paycheck calculator', ctaHref: '/en/final-paycheck-laws-by-state/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'Montana'), options: opts(a.rows) }],
    run: (v) => {
      const r = a.rows[v.s]; if (!r) return { head: ['Rule', '–'], rows: [] };
      const mt = r[0] === 'Montana';
      return { head: ['Employment rule', mt ? 'Good cause needed after probation' : 'At will'], rows: [['Final pay', r[7]], ['Unused vacation', r[8] === 'required' ? 'paid out' : r[8] === 'policy' ? 'per written policy' : 'no state rule'], ['Right-to-work state', r[13] < 0 ? 'not confirmed here' : r[13] ? 'yes' : 'no']] };
    },
  };
};
