/** One worker, one state: minimum wage check, weekly pay with the state overtime rule, sick leave earned, breaks owed, final pay rule. */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { sickAccrual } from '../../lib/engine/leave';
import { breaksForShift } from '../../lib/engine/breaks';
import { Result, Rows, LockedField, usd, usd2 } from './parts';
import { otFor, ruleText, ptoText, stateOptions } from './shared';
import type { ClientState } from './client-types';

interface Props { states: ClientState[]; state: string; lockState?: boolean; methodHref?: string; idPrefix?: string }
export default function RightsTool({ states, state, lockState = false, methodHref = '/en/method/', idPrefix = 'r' }: Props) {
  const def = states.find((s) => s.slug === state) ?? states[0];
  const [slug, setSlug] = useState(def.slug);
  const [rate, setRate] = useState(def.mw);
  const [hpd, setHpd] = useState(8);
  const [days, setDays] = useState(5);
  useEffect(() => {
    const u = readParams(window.location.search);
    const s = str(u, 'st', def.slug); if (!lockState && states.some((x) => x.slug === s)) setSlug(s);
    setRate(num(u, 'rate', def.mw)); setHpd(num(u, 'h', 8)); setDays(num(u, 'd', 5));
  }, []);
  useEffect(() => { updateURL({ st: lockState ? undefined : slug, rate, h: hpd, d: days }); }, [slug, rate, hpd, days]);
  const S = states.find((s) => s.slug === slug) ?? def;
  const ot = useMemo(() => otFor(S, rate, hpd, days), [S, rate, hpd, days]);
  const weekHours = hpd * Math.min(7, Math.max(0, Math.round(days)));
  const sick = sickAccrual(weekHours, 52, S.sick.mandatory ? S.sick.perHours : null, S.sick.cap);
  const br = breaksForShift(S.breaks, hpd);
  const below = rate < S.mw;
  const rows: Array<[string, string]> = [
    [`Minimum wage in ${S.name} now`, `${usd2(S.mw)} an hour${S.federal ? ' (federal floor)' : ''}`],
    ['Your rate against it', below ? `${usd2(S.mw - rate)} an hour short` : 'At or above the minimum'],
    [`Overtime: ${ot.otHours + ot.doubleHours > 0 ? `${ot.otHours} h at 1.5x${ot.doubleHours ? `, ${ot.doubleHours} h at 2x` : ''}` : 'none this week'}`, usd(ot.otPay + ot.doublePay)],
    ['Paid sick leave earned in a year', S.sick.mandatory && S.sick.perHours ? `${Math.floor(sick.accrued)} hours${sick.capped ? ' (cap reached)' : ''}` : 'No statewide paid sick leave law'],
    [`Breaks owed in a ${hpd}-hour shift`, br.meals || br.rests ? [br.meals ? `${br.mealMinutes} min meal` : '', br.rests ? `${br.rests} x ${br.restMinutes / br.rests} min paid rest` : ''].filter(Boolean).join(', ') : S.breaks.meal || S.breaks.rest ? 'State rule without a set length: see the state page' : S.breaks.minorsOnly ? 'None for adults (minors only)' : 'None required for adults'],
    ['Final paycheck if fired', S.final.fired],
    ['Unused vacation at the end', ptoText(S.final.pto)],
    ['Paid family leave', S.pfl ? `${S.pfl.name}${S.pfl.from ? ` (benefits from ${S.pfl.from})` : ''}${S.pfl.weeks ? `, up to ${S.pfl.weeks} weeks` : ''}` : 'No state program'],
  ];
  const p = idPrefix;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {lockState ? <LockedField label="State" value={S.name} /> : <SelectField id={`${p}-st`} label="State where you work" value={slug} onChange={(v) => { setSlug(v); const n = states.find((x) => x.slug === v); if (n) setRate(n.mw); }} options={stateOptions(states)} />}
        <NumberField id={`${p}-rate`} label="Your hourly pay" value={rate} onChange={setRate} unit="$" max={500} decimals={2} help="Before taxes, without tips." />
        <NumberField id={`${p}-h`} label="Hours per shift" value={hpd} onChange={setHpd} unit="h" max={24} decimals={1} />
        <NumberField id={`${p}-d`} label="Shifts per week" value={days} onChange={setDays} unit="days" max={7} />
      </form>
      <Result label={`Gross pay for this week in ${S.name}`} value={usd(ot.total)} sub={ruleText(S)} methodHref={methodHref}
        note={`${weekHours} hours a week at ${usd2(rate)}. ${ot.basis === 'federal' ? 'The federal 40-hour rule gives more here.' : 'State rule applied.'} Minimum wage, overtime and leave rules have exceptions by employer size and industry.`}>
        <Rows rows={rows} />
      </Result>
      </div>
    </div>
  );
}
