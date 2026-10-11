/** What the minimum wage pays in a state, a region or a city: hourly, weekly, monthly and yearly, with the 2026 and 2027 changes. */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { earnings } from '../../lib/engine/wage';
import { Result, Rows, LockedField, usd, usd2 } from './parts';
import { stateOptions } from './shared';
import P from '../../data/params-2026.json';
import type { ClientState } from './client-types';

interface Props { states: ClientState[]; state: string; lockState?: boolean; methodHref?: string; idPrefix?: string }
export default function MinWageTool({ states, state, lockState = false, methodHref = '/en/method/', idPrefix = 'mw' }: Props) {
  const def = states.find((s) => s.slug === state) ?? states[0];
  const [slug, setSlug] = useState(def.slug);
  const [area, setArea] = useState(0);
  const [hours, setHours] = useState(40);
  useEffect(() => {
    const u = readParams(window.location.search);
    const s = str(u, 'st', def.slug); if (!lockState && states.some((x) => x.slug === s)) setSlug(s);
    setArea(num(u, 'a', 0)); setHours(num(u, 'h', 40));
  }, []);
  useEffect(() => { updateURL({ st: lockState ? undefined : slug, a: area || undefined, h: hours }); }, [slug, area, hours]);
  const S = states.find((s) => s.slug === slug) ?? def;
  const A = S.areas[area] ?? S.areas[0] ?? { label: S.name, rate: S.mw, local: false };
  const e = useMemo(() => earnings(A.rate, hours), [A.rate, hours]);
  const rows: Array<[string, string]> = [
    ['Per week', usd(e.weekly)], ['Per month', usd(e.monthly)], ['Per year (52 weeks)', usd(e.annual)],
    [`State rate on January 1, 2026`, usd2(Math.max(S.jan, P.federal.minWage))],
    ...(S.r2027 != null && !A.local ? [[`Announced for ${S.r2027From?.slice(0, 4) ?? '2027'}`, usd2(S.r2027)] as [string, string]] : []),
    ...(S.tipped != null ? [[S.tipCredit ? 'Tipped cash wage (tip credit)' : 'Tipped workers', S.tipCredit ? usd2(S.tipped) : `Full ${usd2(S.mw)}, no tip credit`] as [string, string]] : []),
  ];
  const opts = S.areas.map((a, i) => ({ value: String(i), label: a.local ? `${a.label} (local)` : a.label }));
  const p = idPrefix;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {lockState ? <LockedField label="State" value={S.name} /> : <SelectField id={`${p}-st`} label="State" value={slug} onChange={(v) => { setSlug(v); setArea(0); }} options={stateOptions(states)} />}
        {opts.length > 1 ? <SelectField id={`${p}-a`} label="Area or city" value={String(area)} onChange={(v) => setArea(Number(v))} options={opts} /> : <LockedField label="Area or city" value={opts[0]?.label ?? 'Statewide'} />}
        <NumberField id={`${p}-h`} label="Hours per week" value={hours} onChange={setHours} unit="h" max={100} decimals={1} />
      </form>
      <Result label={`Minimum wage, ${A.label}`} value={`${usd2(A.rate)}/h`} sub={S.federal && !A.local ? `${S.name} has no higher state rate: the federal ${usd2(P.federal.minWage)} applies to covered employers.` : `In force on the check date of this site${A.local ? ', local ordinance' : ''}.`} methodHref={methodHref}
        note="Straight-time pay before taxes. Overtime, tips, youth and training wages and exemptions are not included.">
        <Rows rows={rows} />
      </Result>
      </div>
    </div>
  );
}
