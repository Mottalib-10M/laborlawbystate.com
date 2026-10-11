/** Final paycheck deadline: fired, quitting or quitting with notice, from the last day of work, with the vacation payout rule. */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { readParams, str, updateURL } from '../../lib/url-state';
import { addDays, weekday } from '../../lib/engine/dates';
import { day } from '../../lib/fmt';
import { Result, Rows, LockedField } from './parts';
import { ptoText, stateOptions } from './shared';
import type { ClientState } from './client-types';

declare const __BUILD_DAY__: string;
interface Props { states: ClientState[]; state: string; lockState?: boolean; methodHref?: string; idPrefix?: string }
export default function FinalPayTool({ states, state, lockState = false, methodHref = '/en/method/', idPrefix = 'fp' }: Props) {
  const def = states.find((s) => s.slug === state) ?? states[0];
  const [slug, setSlug] = useState(def.slug);
  const [how, setHow] = useState<'fired' | 'quit'>('fired');
  const [last, setLast] = useState(__BUILD_DAY__);
  useEffect(() => {
    const u = readParams(window.location.search);
    const s = str(u, 'st', def.slug); if (!lockState && states.some((x) => x.slug === s)) setSlug(s);
    setHow(str(u, 'how', 'fired') === 'quit' ? 'quit' : 'fired'); setLast(str(u, 'last', new Date().toISOString().slice(0, 10)));
  }, []);
  useEffect(() => { updateURL({ st: lockState ? undefined : slug, how, last }); }, [slug, how, last]);
  const S = states.find((s) => s.slug === slug) ?? def;
  const rule = how === 'fired' ? S.final.fired : S.final.quit;
  const fixed = how === 'fired' && S.final.firedDays != null ? addDays(last, S.final.firedDays) : null;
  const rows: Array<[string, string]> = [
    ['Rule in ' + S.name, rule],
    ...(how === 'quit' && S.final.quitNotice ? [['If you gave notice', S.final.quitNotice] as [string, string]] : []),
    ['Unused vacation', ptoText(S.final.pto)],
    ['Who to contact if it is late', S.agency.name],
  ];
  const p = idPrefix;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {lockState ? <LockedField label="State" value={S.name} /> : <SelectField id={`${p}-st`} label="State where you worked" value={slug} onChange={setSlug} options={stateOptions(states)} />}
        <Toggle id={`${p}-how`} label="How the job ended" value={how} onChange={(v) => setHow(v as 'fired' | 'quit')} options={[{ value: 'fired', label: 'Let go' }, { value: 'quit', label: 'I quit' }]} />
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${p}-last`} className="mb-1 block text-sm font-medium text-navy-700">Last day of work</label>
          <input id={`${p}-last`} type="date" value={last} onChange={(e) => e.target.value && setLast(e.target.value)} className="h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
          <span className="mt-1 text-xs text-navy-500">The deadline counts from this day.</span>
        </div>
      </form>
      <Result label={how === 'fired' ? 'Final pay due when let go' : 'Final pay due when you quit'} value={fixed ? day(fixed) : rule.length < 40 ? rule : 'See the rule below'} sub={fixed ? `${weekday(fixed)}, ${S.final.firedDays === 0 ? 'the same day' : `${S.final.firedDays} calendar days after ${day(last)}`}` : 'Deadline tied to your payday or to notice; see the rule.'} methodHref={methodHref}
        note="General rule for private employers. Some states set different deadlines for layoffs, strikes or particular industries.">
        <Rows rows={rows} />
      </Result>
    </div>
  );
}
