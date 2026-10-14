/** Overtime under the rule of a state (daily and weekly thresholds, double time, 7th day) against the FLSA 40-hour rule. */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { overtime, FEDERAL_RULE } from '../../lib/engine/overtime';
import { Result, Rows, LockedField, usd, usd2 } from './parts';
import { ruleFor, ruleText, stateOptions } from './shared';
import type { ClientState } from './client-types';

interface Props { states: ClientState[]; state: string; lockState?: boolean; methodHref?: string; idPrefix?: string }
export default function OvertimeTool({ states, state, lockState = false, methodHref = '/en/method/', idPrefix = 'ot' }: Props) {
  const def = states.find((s) => s.slug === state) ?? states[0];
  const [slug, setSlug] = useState(def.slug);
  const [rate, setRate] = useState(20);
  const [hpd, setHpd] = useState(10);
  const [days, setDays] = useState(5);
  useEffect(() => {
    const u = readParams(window.location.search);
    const s = str(u, 'st', def.slug); if (!lockState && states.some((x) => x.slug === s)) setSlug(s);
    setRate(num(u, 'rate', 20)); setHpd(num(u, 'h', 10)); setDays(num(u, 'd', 5));
  }, []);
  useEffect(() => { updateURL({ st: lockState ? undefined : slug, rate, h: hpd, d: days }); }, [slug, rate, hpd, days]);
  const S = states.find((s) => s.slug === slug) ?? def;
  const r = useMemo(() => overtime(ruleFor(S, rate), { rate, hoursPerDay: hpd, daysPerWeek: days }), [S, rate, hpd, days]);
  const fed = useMemo(() => overtime(FEDERAL_RULE, { rate, hoursPerDay: hpd, daysPerWeek: days }), [rate, hpd, days]);
  const rows: Array<[string, string]> = [
    [`Regular: ${r.regularHours} h x ${usd2(rate)}`, usd(r.regularPay)],
    [`Time and a half: ${r.otHours} h x ${usd2(rate * 1.5)}`, usd(r.otPay)],
    ...(r.doubleHours ? [[`Double time: ${r.doubleHours} h x ${usd2(rate * 2)}`, usd(r.doublePay)] as [string, string]] : []),
    ['Same week under the federal rule only', usd(fed.total)],
    ['Difference made by the state rule', usd(r.total - fed.total)],
  ];
  const p = idPrefix;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <form className="grid content-start gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {lockState ? <LockedField label="State" value={S.name} /> : <SelectField id={`${p}-st`} label="State where you work" value={slug} onChange={setSlug} options={stateOptions(states)} />}
        <NumberField id={`${p}-rate`} label="Regular hourly rate" value={rate} onChange={setRate} unit="$" max={500} decimals={2} help="Include shift differentials and nondiscretionary bonuses if you have them." />
        <NumberField id={`${p}-h`} label="Hours worked each day" value={hpd} onChange={setHpd} unit="h" max={24} decimals={1} />
        <NumberField id={`${p}-d`} label="Days worked in the week" value={days} onChange={setDays} unit="days" max={7} />
      </form>
      <Result label={`Gross pay for the week in ${S.name}`} value={usd(r.total)} sub={ruleText(S)} methodHref={methodHref}
        note="For non-exempt employees. The same hours are used every day; exemptions, industry rules and employer-size limits are not modeled.">
        <Rows rows={rows} />
      </Result>
      </div>
    </div>
  );
}
