/** FMLA: the three eligibility tests, the leave left in the 12-month period, and the paid program of the state. */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import P from '../../data/params-2026.json';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { fmla } from '../../lib/engine/fmla';
import { Result, Rows, LockedField, usd } from './parts';
import { stateOptions } from './shared';
import type { ClientState } from './client-types';

interface Props { states: ClientState[]; state: string; lockState?: boolean; methodHref?: string; idPrefix?: string }
const F = P.fmla;
export default function FmlaTool({ states, state, lockState = false, methodHref = '/en/method/', idPrefix = 'fm' }: Props) {
  const def = states.find((s) => s.slug === state) ?? states[0];
  const [slug, setSlug] = useState(def.slug);
  const [pub, setPub] = useState<'0' | '1'>('0');
  const [site, setSite] = useState(120);
  const [months, setMonths] = useState(18);
  const [hours, setHours] = useState(1800);
  const [used, setUsed] = useState(0);
  const [care, setCare] = useState<'0' | '1'>('0');
  useEffect(() => {
    const u = readParams(window.location.search);
    const s = str(u, 'st', def.slug); if (!lockState && states.some((x) => x.slug === s)) setSlug(s);
    setPub(str(u, 'pub', '0') === '1' ? '1' : '0'); setSite(num(u, 'e', 120)); setMonths(num(u, 'm', 18)); setHours(num(u, 'hrs', 1800)); setUsed(num(u, 'u', 0)); setCare(str(u, 'mc', '0') === '1' ? '1' : '0');
  }, []);
  useEffect(() => { updateURL({ st: lockState ? undefined : slug, pub: pub === '1' ? 1 : undefined, e: site, m: months, hrs: hours, u: used || undefined, mc: care === '1' ? 1 : undefined }); }, [slug, pub, site, months, hours, used, care]);
  const S = states.find((s) => s.slug === slug) ?? def;
  const r = useMemo(() => fmla(F, { publicEmployer: pub === '1', employerSize: site, employeesWithin75: site, monthsEmployed: months, hours12m: hours, weeksUsed: used, caregiver: care === '1' }), [pub, site, months, hours, used, care]);
  const ok = (b: boolean) => (b ? 'Met' : 'Not met');
  const rows: Array<[string, string]> = [
    [pub === '1' ? 'Employer covered (public agency or school)' : `Employer: ${F.employerEmployees}+ employees`, ok(r.coveredEmployer)],
    [`${F.worksiteEmployees}+ employees within ${F.radiusMiles} miles`, ok(r.site)],
    [`${F.months} months with this employer`, r.tenure ? 'Met' : `${r.monthsShort} more months`],
    [`${F.hours.toLocaleString('en-US')} hours in the last 12 months`, r.hours ? 'Met' : `${r.hoursShort.toLocaleString('en-US')} hours short`],
    ['Leave left in the 12-month period', `${r.left} of ${r.entitlement} workweeks`],
    [`Paid leave program in ${S.name}`, S.pfl ? `${S.pfl.name}${S.pfl.from ? ` (benefits from ${S.pfl.from})` : ''}${S.pfl.weeks ? `, up to ${S.pfl.weeks} weeks` : ''}${S.pfl.maxWeekly ? `, max ${usd(S.pfl.maxWeekly)}/week` : ''}` : 'None: FMLA leave is unpaid unless you use PTO'],
  ];
  const p = idPrefix;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {lockState ? <LockedField label="State" value={S.name} /> : <SelectField id={`${p}-st`} label="State where you work" value={slug} onChange={setSlug} options={stateOptions(states)} />}
        <Toggle id={`${p}-pub`} label="Public agency or school?" value={pub} onChange={(v) => setPub(v as '0' | '1')} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
        <NumberField id={`${p}-e`} label={`Employees within ${F.radiusMiles} miles`} value={site} onChange={setSite} max={1000000} help="Of your employer, counted around your worksite." />
        <NumberField id={`${p}-m`} label="Months with this employer" value={months} onChange={setMonths} unit="months" max={600} help="Need not be in a row (breaks under 7 years count)." />
        <NumberField id={`${p}-hrs`} label="Hours worked in the last 12 months" value={hours} onChange={setHours} unit="h" max={8784} help="Hours actually worked; paid leave does not count." />
        <NumberField id={`${p}-u`} label="FMLA weeks already used" value={used} onChange={setUsed} unit="weeks" max={52} decimals={1} />
        <Toggle id={`${p}-mc`} label="Caring for an injured servicemember?" value={care} onChange={(v) => setCare(v as '0' | '1')} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
      </form>
      <Result label="FMLA eligibility" value={r.eligible ? 'Eligible' : 'Not eligible'} sub={r.eligible ? `${r.left} workweeks of job-protected leave left` : 'Your state law or employer policy may still give leave'} methodHref={methodHref}
        note="Tests of 29 CFR 825.110. The employer counts the 12-month period one of four ways (calendar year, fixed year, from first use, or rolling back).">
        <Rows rows={rows} />
      </Result>
    </div>
  );
}
