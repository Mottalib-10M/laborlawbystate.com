import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, tippedCash, rate$, usd, usdx, day, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('hawaii');
const now = mwNow('hawaii');
const cash = tippedCash('hawaii')!;
const credit = now - cash;
const gap = Number(S.minWage.tipped.note!.match(/at least \$([\d.]+) above/)![1]);
const line = now + gap;
const step = S.minWage.rates2026[0].note!.match(/\$([\d.]+) on (\d{4}-\d{2}-\d{2})/)!;
const r28 = Number(step[1]);
const d28 = step[2];
const before = Number(S.notes[0].text.match(/from \$([\d.]+)/)![1]);
const guar = Number(S.overtime.exemptSalaryNote!.match(/\$([\d,]+) or more per month/)![1].replace(/,/g, ''));
const tipUrl = (S as unknown as { tippedSource?: { url: string } }).tippedSource?.url ?? S.agency.url;
const year = fullTimeAt(now);
const lift = fullTimeAt(r28).annual - year.annual;

export default defineStatePage({
  slug: 'hawaii',
  title: `Hawaii Minimum Wage 2026: ${rate$(now)} and a Tip Credit Test`,
  description: `Hawaii in 2026: ${rate$(now)} an hour, a ${rate$(credit)} tip credit allowed only when pay plus tips reach ${rate$(line)}, no 2027 raise, TDI for illness, last pay next working day.`,
  intro: 'A minimum wage that jumped in January and then pauses until 2028, a tip credit with a condition no other state copies, and no sick leave mandate.',
  resume: `Hawaii pays a minimum wage of ${rate$(now)} an hour in 2026, up from ${rate$(before)} last year, and the next step is ${rate$(r28)} on ${day(d28)}, with no change at all in 2027. A full-time year at the current rate comes to ${usd(year.annual)} before taxes. Restaurants and hotels may count tips toward only ${rate$(credit)} of that wage, paying a cash wage of ${rate$(cash)}, and only for workers whose employer pay plus tips reaches at least ${rate$(line)} an hour. Overtime follows the weekly 40-hour rule, while anyone guaranteed ${usd(guar)} or more a month falls outside the state overtime law. There is no paid sick leave mandate, but Temporary Disability Insurance replaces part of your wages when you cannot work because of an illness or injury off the job. A fired worker is paid on the spot or by the next working day.`,
  body: (h) => `
<h2>The ${rate$(line)} condition behind the Hawaii tip credit</h2>
<p>Most states that allow a tip credit let the employer subtract several dollars from the hourly wage as long as tips fill the hole. Hawaii keeps the deduction small, ${rate$(credit)} an hour in 2026 and 2027, and attaches a test to it: the worker's combined pay from the employer and tips must come to at least ${rate$(gap)} above the minimum wage, which means ${rate$(line)} an hour this year. A breakfast server in Kailua who averages $4 an hour in tips stays well under that line, so the restaurant owes the full ${rate$(now)} and may not drop to ${rate$(cash)}. A Waikiki bartender averaging $12 in tips clears it easily, and the employer may then use the credit. The Wage Standards Division explains the test in its ${h.ext(tipUrl, 'tip credit notice')}. Few places attach such a condition, which is why ${h.a('tipped-minimum-wage', 'tipped wages in other states')} compare poorly with Hawaii.</p>
<h2>A pause in 2027, then ${rate$(r28)}</h2>
<p>The law that raised the floor wrote its steps two years apart. After ${rate$(now)} in January 2026, no increase arrives on January 1, 2027, and the following step is ${rate$(r28)} in ${day(d28)}. For someone working 40 hours a week all year, that later step is worth ${usd(lift)} before taxes. Hawaii has no county or city minimum wage, so a cook on Maui and a cashier in Hilo share the same rate.</p>
<h2>Salaried at ${usd(guar)} a month: outside the state overtime law</h2>
<p>Overtime under Hawaii law is time and a half after 40 hours in a week, with no daily threshold for private employers; the 8-hour daily rule covers only state and county public works construction. The state exempts any employee guaranteed ${usd(guar)} or more a month, about ${usd(guar * 12)} a year, whatever the job duties. That does not end the matter: most employers are also covered by the federal Fair Labor Standards Act, whose exemption requires a salary of at least ${usd(F.exemptWeekly)} a week and duties that really are executive, administrative or professional. A well-paid dispatcher with no managerial role can therefore fall outside the state rule and still be owed federal overtime.</p>
<h2>Illness and family care without a paid leave program</h2>
<p>No Hawaii statute requires paid sick days in the private sector. Employers that offer them must set out the policy in writing, and those with 100 or more employees must let staff use up to 10 days of that sick leave to care for a relative. What Hawaii does have is Temporary Disability Insurance, an employer-provided benefit for an employee's own illness or injury off the job: it starts on the 8th day of disability, lasts up to 26 weeks and pays 58% of average weekly wages up to a yearly cap set by the Disability Compensation Division. Family care is covered by the Hawaii Family Leave Law: 4 weeks of unpaid, job-protected leave a year at employers with 100 or more workers in the state, open after 6 months of service with no hours test, unlike the ${FM.hours.toLocaleString('en-US')} hours the FMLA demands.</p>
<h2>Paydays and the last check</h2>
<p>Wages are paid at least twice a month, within seven days after each pay period closes. A discharged worker receives everything at the time of discharge or by the next working day. Someone who resigns is paid by the next regular payday, or on the last day when they gave a full pay period of notice. Vacation pay depends entirely on the employer's written policy. A wage claim goes to the Wage Standards Division, which decides it; an employment lawyer can look at a particular case.</p>
${h.mini('atWillState', stateArg('Hawaii'))}`,
  faqs: [
    { q: 'Will the Hawaii minimum wage go up in 2027?', a: `No. The rate stays at ${rate$(now)} an hour through 2027. The schedule written into state law skips a year and brings the next increase, to ${rate$(r28)}, on ${day(d28)}. The tip credit stays at ${rate$(credit)} until then and rises when the 2028 rate takes effect. Hawaii has no county minimum wages, so the state rate applies everywhere in the islands.` },
    { q: 'Can a Hawaii restaurant pay servers less than the minimum wage?', a: `Only by ${rate$(credit)} an hour, giving a cash wage of ${rate$(cash)}, and only when the server's pay from the employer plus tips adds up to at least ${rate$(line)} an hour. A server whose tips are lower must receive the full ${rate$(now)}. The credit itself rises when the ${rate$(r28)} rate arrives in 2028, so the condition is worth checking again then.` },
    { q: 'Is there paid sick leave in Hawaii?', a: 'Not as a legal requirement for private employers. Sick days depend on the employer policy, which must be in writing. If you cannot work because of your own illness or injury outside work, Temporary Disability Insurance pays 58% of your average weekly wages, up to a yearly maximum, from the 8th day of disability for up to 26 weeks.' },
    { q: 'When do I get my last paycheck after being fired in HI?', a: 'At the time of discharge, or no later than the next working day. If you quit, your wages are due by the next regular payday, or immediately on your last day when you gave at least one pay period of notice. Unused vacation is paid only if the employer written policy says so. The Wage Standards Division handles unpaid wage complaints.' },
  ],
  related: ['state:alaska', 'state:california', 'tipped-minimum-wage', 'exempt-vs-non-exempt', 'paid-sick-leave-by-state', 'final-paycheck-laws'],
});
