/** Breaks owed for one shift under the state rule for adults. arg: stateArg() */
import type { MiniSpec } from '../mini-types';
import { breaksForShift } from '../engine/breaks';
import { parseArg, opts, pick, type Row } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ rows: Row[]; first?: string }>(arg, { rows: [] });
  return {
    title: 'Breaks owed for your shift',
    cta: 'Your state page', ctaHref: '/en/states/',
    inputs: [{ id: 's', label: 'State', def: pick(a.rows, a.first ?? 'California'), options: opts(a.rows) }, { id: 'h', label: 'Shift length', def: 8, unit: 'h', max: 24, decimals: 1 }],
    run: (v) => {
      const r = a.rows[v.s]; if (!r) return { head: ['Breaks', '–'], rows: [] };
      const b = breaksForShift({ mealMinutes: r[9], mealAfterHours: r[10], restMinutes: r[11], restPerHours: r[12] }, v.h);
      return { head: ['Meal break', b.meals ? `${b.mealMinutes} minutes` : 'None required'], rows: [['Paid rest breaks', b.rests ? `${b.rests} x ${r[11]} minutes` : 'None required'], ['Meal rule', r[9] ? `${r[9]} min after ${r[10]} h` : 'no adult rule'], ['Rest rule', r[11] ? `${r[11]} min per ${r[12]} h` : 'no adult rule']], note: 'Federal law requires no breaks, but short breaks given must be paid.' };
    },
  };
};
