import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, otCalc, sickYear, rate$, usd, day, F, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('minnesota');
const now = mwNow('minnesota');
const next = mw2027('minnesota')!;
const otH = S.overtime.weeklyHours!;
const train = Number(S.minWage.other!.match(/\$([\d.]+)/)![1]);
const train27 = Number(next.note!.match(/\$([\d.]+)/)![1]);
const mpls = S.localMinWages.find((l) => l.name === 'Minneapolis')!;
const mpls27 = Number(mpls.note!.match(/\$([\d.]+) on January 1, 2027/)![1]);
const stp = S.localMinWages.find((l) => l.name.startsWith('Saint Paul'))!;
const micro = Number(stp.note!.match(/Micro \(5 or fewer\): \$([\d.]+)/)![1]);
const state = otCalc('minnesota', 20, 10, 5);
const fed = otCalc('texas', 20, 10, 5);
const sl = S.sickLeave;
const esst = sickYear('minnesota', 40);
const pl = S.familyLeave;
const cityYear = fullTimeAt(mpls.rate).annual - fullTimeAt(now).annual;

export default defineStatePage({
  slug: 'minnesota',
  title: `Minnesota Labor Laws 2026: ${otH}-Hour Overtime, ${rate$(now)} Wage`,
  description: `Minnesota labor laws 2026: ${rate$(now)} state wage (${rate$(next.rate)} in 2027), ${rate$(mpls.rate)} in Minneapolis, no tip credit, Paid Leave of up to ${pl.maxWeeks} weeks, new paid rest breaks.`,
  intro: `A state overtime threshold of ${otH} hours that federal law usually overrides, cities paying far above the state rate, and a year of new leave and break rules.`,
  resume: `Minnesota's own overtime law starts time and a half only after ${otH} hours a week, but most employers are also covered by the federal rule, which owes overtime after ${F.otWeeklyHours} hours, and the stricter rule wins. The state minimum wage is ${rate$(now)} an hour in 2026 for every employer size and rises to ${rate$(next.rate)} on ${day(next.from)}. Minneapolis and the larger Saint Paul employers pay ${rate$(mpls.rate)}. There is no tip credit, so servers receive the full wage before tips. Earned Sick and Safe Time accrues at ${sl.accrual}, at least ${sl.capHours} hours a year. Minnesota Paid Leave began paying on ${day(pl.benefitsStart!)}, for up to ${pl.maxWeeks} weeks a year combined. Since January 2026 workers also get a 15-minute rest break every 4 hours and a 30-minute meal break on shifts of 6 hours or more.`,
  body: (h) => `
<h2>Why the ${otH}-hour rule rarely decides your overtime</h2>
<p>Minnesota is one of the few states whose overtime statute sets a threshold above the federal one. Read alone, it would let an employer pay straight time up to ${otH} hours. In practice the Fair Labor Standards Act reaches most businesses, through annual sales or work tied to interstate commerce, and where both laws apply the employee gets the better result. A warehouse picker paid $20 an hour for five 10-hour days shows the gap: the state rule counts ${state.otHours} overtime hours and a week of ${usd(state.total)}, while the federal rule counts ${fed.otHours} and a week of ${usd(fed.total)}. The state threshold matters mainly at small local businesses outside federal coverage. Whether yours is one of them is a factual question for the Department of Labor and Industry, which decides wage claims.</p>
<h2>Rest and meal breaks rewritten for 2026</h2>
<p>Until the end of 2025 the law promised only "adequate time" for the restroom and a meal break on shifts of 8 hours. Since January 1, 2026, every worker is owed at least 15 minutes, or longer if the nearest restroom is far, within each four consecutive hours, and that rest time is paid. Anyone working six or more consecutive hours gets at least 30 minutes for a meal. A nurse aide on a 12-hour shift in Duluth is therefore owed three paid rest breaks and a meal period.</p>
${h.mini('shiftBreaks', stateArg('Minnesota'))}
<h2>Twin Cities wages and the full wage for tipped staff</h2>
<p>The gap between the state floor and the two big cities is wide. Minneapolis pays ${rate$(mpls.rate)} to every worker regardless of employer size or age, rising to ${rate$(mpls27)} in January 2027, which adds ${usd(cityYear)} a year over the state rate for full-time work. Saint Paul uses tiers: employers with 101 or more workers and, since July 1, 2026, those with 6 to 100 pay ${rate$(stp.rate)}, while micro businesses with 5 or fewer pay ${rate$(micro)}. Minnesota allows no tip credit anywhere, so a bartender in Rochester starts from ${rate$(now)} before tips and one in Minneapolis from ${rate$(mpls.rate)}. Employers may pay workers under 20 a training wage of ${rate$(train)} for their first 90 days, ${rate$(train27)} in 2027.</p>
${h.mini('tipTopUp', stateArg('Minnesota'))}
<h2>Leave and the end of a job</h2>
<p>Earned Sick and Safe Time covers employees expected to work at least 80 hours a year in the state. A full-time worker accrues ${Math.floor(esst.accrued)} hours over a year, and the employer may stop accrual at ${esst.capped}, with a carryover balance of at least 80 hours; revised ESST rules took effect on July 6, 2026. Minnesota Paid Leave, run by DEED, pays up to 12 weeks for your own health and 12 for family reasons, capped at ${pl.maxWeeks} weeks combined, replacing 90% of wages up to half the state average weekly wage and smaller shares above. When you are fired, final wages are due within 24 hours of your demand. When you quit, pay arrives by the first payday more than five days later, and no later than 20 days after leaving. Vacation payout follows company policy.</p>`,
  faqs: [
    { q: 'Is overtime after 40 or 48 hours in Minnesota?', a: `Both rules exist. Minnesota law requires time and a half after ${otH} hours a week, but the federal Fair Labor Standards Act requires it after ${F.otWeeklyHours} hours for the many employers it covers, and the rule more favorable to the worker applies. Only employees of businesses outside federal coverage, typically small local ones, are left with the ${otH}-hour threshold. The Department of Labor and Industry answers coverage questions.` },
    { q: 'Do Minnesota employers have to give paid rest breaks in 2026?', a: 'Yes. Since January 1, 2026, Minnesota requires a rest break of at least 15 minutes within each four consecutive hours of work, or longer if needed to reach the nearest restroom, and the break is paid. Employees working six or more consecutive hours must also receive a meal break of at least 30 minutes. Before 2026 the meal rule applied only to shifts of 8 hours.' },
    { q: 'Can a Minnesota restaurant pay tipped servers less than minimum wage?', a: `No. Minnesota does not allow a tip credit, so tipped workers receive at least ${rate$(now)} an hour before tips in 2026, rising to ${rate$(next.rate)} in 2027, or the higher city rate in Minneapolis and Saint Paul. Tips come on top of that wage, never in place of it. The only lower rate is the 90-day training wage for workers under 20.` },
    { q: 'How long is Minnesota Paid Leave?', a: `Up to ${pl.maxWeeks} weeks in a benefit year when needs combine: 12 weeks for your own serious health condition and 12 for family reasons such as bonding with a new child or caring for a relative. Benefits started on ${day(pl.benefitsStart!)} and are paid by the Department of Employment and Economic Development, as a share of your wages up to a weekly maximum tied to the state average weekly wage.` },
  ],
  related: ['state:wisconsin', 'state:iowa', 'state:north-dakota', 'state:south-dakota', 'overtime-laws-by-state', 'break-laws-by-state'],
});
