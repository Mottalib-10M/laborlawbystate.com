import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, rate$, usd, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('ohio');
const mw = mwNow('ohio');
const next = mw2027('ohio')!;
const money = (s: string) => s.match(/\$[\d,]+/)![0];
const cut = money(S.minWage.headlineArea!);
const cut27 = money(next.area);
const tip = S.minWage.tipped.cashWage!;
const tip27 = Number(S.minWage.tipped.note!.match(/\$(\d+\.\d+) on 2027/)![1]);
const big = fullTimeAt(mw).annual, small = fullTimeAt(F.minWage).annual;
const hrs = 32;
const raiseYear = (next.rate - mw) * hrs * 52;

export default defineStatePage({
  slug: 'ohio',
  title: `Ohio Minimum Wage 2026: ${rate$(mw)} Rising to ${rate$(next.rate)} in 2027`,
  description: `Ohio in 2026: ${rate$(mw)} at businesses grossing over ${cut} a year, ${rate$(F.minWage)} below that, ${rate$(tip)} tipped, and ${rate$(next.rate)} from 2027 under the state constitution's indexing.`,
  intro: 'The minimum wage is in the state constitution, it rises with prices every January, and whether it applies to you depends on your employer\'s sales.',
  resume: `Ohio's minimum wage is ${rate$(mw)} an hour in 2026 for non-tipped employees of businesses with annual gross receipts above ${cut}, and it rises to ${rate$(next.rate)} on January 1, 2027, when that coverage threshold also moves to ${cut27}. Smaller businesses and 14- and 15-year-old workers are tied to the federal ${rate$(F.minWage)}. Tipped employees of covered businesses receive at least ${rate$(tip)} in cash, ${rate$(tip27)} from January, with tips making up the rest. The figures come from a 2006 constitutional amendment that indexes the rate each year to inflation. Full-time work at the higher rate pays ${usd(big)} a year, against ${usd(small)} at the federal floor. Overtime follows the federal pattern, time and a half after ${S.overtime.weeklyHours} hours a week with the same exemptions. Ohio has no statewide paid sick leave or paid family leave law, vacation payout depends on the employer's policy, and only workers under 18 have a break requirement.`,
  body: (h) => `
<h2>Two rates split by a sales figure</h2>
<p>Ohio decides which minimum wage applies by looking at the employer's annual gross receipts. Above ${cut} in 2026, the rate is ${rate$(mw)}; at or below it, the business owes the federal ${rate$(F.minWage)}. The threshold itself is indexed, so it moves to ${cut27} on January 1, 2027. Two people doing the same job across the street from each other can therefore earn different legal minimums, one at a regional grocery chain and one at a small family store. Age matters too: 14- and 15-year-olds are on the federal rate at any employer.</p>
<p>The gap is large. A full-time worker earns ${usd(big - small)} more a year at the state rate than at the federal one. If you are unsure which side your employer falls on, the Bureau of Wage and Hour Administration at the Department of Commerce answers coverage questions.</p>
<h2>A wage written into the constitution</h2>
<p>Voters approved Article II, Section 34a in November 2006. It requires the rate to be recalculated every January 1 from the CPI-W for the 12 months ending in August, which is why the Department of Commerce announces the next figure each autumn. On September 30, 2026 it announced the 2027 figures: ${rate$(next.rate)} for non-tipped employees and ${rate$(tip27)} for tipped employees. The 2027 threshold of ${cut27} comes from the same announcement.</p>
<p>For a part-timer working ${hrs} hours a week at a covered business, the 2027 step adds ${usd(raiseYear)} over a year.</p>
${h.mini('raiseTimeline', stateArg('Ohio'))}
<h2>Tipped pay and overtime</h2>
<p>Restaurants and bars at covered businesses may pay ${rate$(tip)} an hour in cash, provided tips lift the total to ${rate$(mw)} for every hour. A tipped worker is someone who receives more than $30 a month in tips. Overtime law tracks sections 7 and 13 of the FLSA, so the same occupations are exempt and the same 40-hour week applies: hours beyond ${S.overtime.weeklyHours} are paid at one and a half times the regular rate. The salary test for exempt staff is the federal ${usd(F.exemptWeekly)} a week.</p>
${h.mini('tipTopUp', stateArg('Ohio'))}
<h2>Leave, breaks and the last paycheck</h2>
<p>No Ohio statute requires private employers to provide paid sick days or paid family leave, so time off follows the employer's policy and, for eligible workers, the unpaid federal FMLA of up to ${FM.weeks} weeks. Vacation pay is defined as a fringe benefit, owed under the employer's agreement or written policy rather than by statute. Adults have no state meal or rest break rule; minors must receive at least 30 minutes after more than five consecutive hours. Ohio's general pay-timing statute sets semi-monthly paydays, and the rules section below quotes it; for a final check, ask the Bureau of Wage and Hour Administration how it applies to your situation, or compare ${h.a('final-paycheck-laws', 'final paycheck rules across states')}.</p>`,
  faqs: [
    { q: 'Does the Ohio minimum wage apply to small businesses?', a: `Not the ${rate$(mw)} rate. In 2026 it applies to employers with annual gross receipts above ${cut}. Businesses at or below that amount must pay the federal ${rate$(F.minWage)}, which also applies to 14- and 15-year-olds everywhere. From January 1, 2027, the threshold rises to ${cut27} and the higher rate becomes ${rate$(next.rate)}.` },
    { q: 'Why does the Ohio minimum wage go up every year?', a: 'Because a constitutional amendment approved by Ohio voters in November 2006, Article II, Section 34a, ties it to inflation. Each January 1 the rate is adjusted by the change in the CPI-W over the 12 months ending in August. The Department of Commerce announces the new figures in the fall, and the coverage threshold for businesses is indexed as well.' },
    { q: 'What is the tipped wage in Ohio for 2027?', a: `${rate$(tip27)} an hour from January 1, 2027, up from ${rate$(tip)} in 2026, for tipped employees of businesses grossing more than ${cut27} a year. Tips must bring the worker to at least the full ${rate$(next.rate)} minimum for each hour. An employee counts as tipped when they receive more than $30 a month in tips.` },
    { q: 'Do Ohio employers have to pay out unused vacation?', a: 'Only if the employer agreed to it. Ohio law lists vacation pay among fringe benefits, which are owed according to the employer\'s agreement or written policy. No statute requires payout on its own. If the handbook promises that unused vacation is paid at separation, that promise is what a wage claim would rest on, so keep a copy of the policy.' },
  ],
  related: ['state:pennsylvania', 'state:michigan', 'state:indiana', 'state:kentucky', 'minimum-wage-increases', 'tipped-minimum-wage'],
});
