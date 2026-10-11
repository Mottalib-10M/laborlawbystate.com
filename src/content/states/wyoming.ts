import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mwState, otCalc, rate$, usd, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('wyoming');
const mw = mwNow('wyoming');
const amt = (s: string | null | undefined, i = 0) => Number([...(s ?? '').matchAll(/\$(\d+(?:\.\d+)?)/g)][i][1]);
const own = amt(S.minWage.smallEmployer);
const youth = amt(S.minWage.other);
const cash = S.minWage.tipped.cashWage!;
const tipLine = amt(S.minWage.tipped.note);
const fedYear = fullTimeAt(mw).annual;
const ownYear = fullTimeAt(own).annual;
const crewRate = 25;
const crew = otCalc('wyoming', crewRate, 12, 4);
const tips = 3.5;
const shortfall = Math.max(0, mw - cash - tips);

export default defineStatePage({
  slug: 'wyoming',
  title: `Wyoming Wage Laws 2026: ${rate$(mw)} Federal Floor, ${rate$(own)} on Paper`,
  description: `Wyoming in 2026: the federal ${rate$(mw)} applies because the state rate is ${rate$(own)}, worth ${usd(fedYear - ownYear)} a year full time; tips belong to the worker and overtime is federal.`,
  intro: 'Wyoming keeps a state minimum wage below the federal one, leaves overtime and breaks to federal law and writes into statute that tips are the worker\'s property.',
  resume: `Most Wyoming workers must be paid at least ${rate$(mw)} an hour in 2026, the federal minimum wage, even though state law still sets ${rate$(own)}. The state figure only matters for the few employers outside the Fair Labor Standards Act, and the gap between the two is ${usd(fedYear - ownYear)} a year for a full-time job. Tipped employees, defined as those who receive more than ${usd(tipLine)} a month in tips, can be paid a cash wage of ${rate$(cash)} as long as tips bring them to the minimum, and the tips themselves belong to the employee by statute. Workers under 20 may be paid ${rate$(youth)} during their first 90 consecutive days. Wyoming has no general overtime law, so the federal rule of time and a half after ${F.otWeeklyHours} hours a week applies. There is no state paid sick leave, paid family leave or break requirement, and vacation is owed only if the employer agreed to it. Final wages are due by the next regular payday.`,
  body: (h) => `
<h2>Why the state number is not the one you are paid</h2>
<p>Title 27 of the Wyoming statutes still tells every employer to pay at least ${rate$(mwState('wyoming'))} an hour. That figure is lower than the federal minimum, and federal law wins wherever it applies, which is almost everywhere: the Department of Workforce Services says plainly that most workers must be paid ${rate$(mw)}. The state rate survives only for the few employers that the FLSA does not cover. For everyone else, the difference is not academic. A full-time year at the federal rate pays ${usd(fedYear)}; at the state rate it would be ${usd(ownYear)}. If a pay stub shows less than ${rate$(mw)} an hour, the first question is whether the employer is really outside federal coverage, and the U.S. Department of Labor is the agency that answers it.</p>
${h.mini('stateCompare', stateArg('Wyoming'))}
<h2>Long shifts under federal overtime</h2>
<p>Wyoming has overtime rules only for public works projects and some state and county employees. Private employers follow the FLSA alone: time and a half after ${F.otWeeklyHours} hours in a workweek, no daily threshold and no double time. That matters on compressed schedules. A crew member paid $${crewRate} an hour on four 12-hour shifts works ${crew.regularHours + crew.otHours} hours and earns ${usd(crew.total)}, including ${usd(crew.otPay)} for ${crew.otHours} overtime hours. In a state with a daily rule the same week would carry overtime every day; in Wyoming only the weekly total counts. For exempt salaried staff, the test is the federal ${usd(F.exemptWeekly)} a week.</p>
<h2>Tips that stay with the worker</h2>
<p>Wyoming statute is unusually direct about gratuities: tips received by an employee are the sole property of that employee and cannot be paid over, in whole or in part, to the employer or anyone else. An employer may still count tips toward the minimum wage, paying a cash wage of ${rate$(cash)}, but it must make up any shortfall. A barista who averages $${tips} an hour in tips has ${rate$(cash + tips)} an hour from wage and tips combined, so the employer owes ${rate$(shortfall)} more for each hour. The ${h.ext(S.notes[0].source.url, 'statute text')} is in the Title 27 compilation.</p>
${h.mini('tipTopUp', stateArg('Wyoming'))}
<h2>Leave, breaks and the last paycheck</h2>
<p>Wyoming law does not require employers to give vacation or to pay it out at the end of a job; an employer that agreed to a vacation plan must honor that agreement. There is no state paid sick leave and no paid family leave program, so unpaid job-protected leave comes from the federal FMLA and its ${FM.employerEmployees}-employee threshold. Federal law requires no meal or rest breaks, and no Wyoming statute adding one was found for this guide. Whether you quit or are discharged, the wages due must be paid no later than the employer's next regularly scheduled payday. Wyoming is a right-to-work state under section 27-7-109: no one has to join or remain in a union to keep a job. Employment is at will. ${h.a('right-to-work-states', 'Other right-to-work states')} follow a similar rule.</p>`,
  faqs: [
    { q: `Why does Wyoming list a ${rate$(own)} minimum wage?`, a: `Because the figure written in the state statute is older than the federal rate, and it rarely applies. Wyoming law sets ${rate$(own)} an hour, while the federal Fair Labor Standards Act requires ${rate$(mw)} for nearly every employer. When both laws apply, the higher federal rate wins. Only an employer that the FLSA does not cover could pay the state rate, and the Department of Workforce Services notes that most workers must receive ${rate$(mw)}.` },
    { q: 'Does Wyoming require overtime pay?', a: `Not under state law for private employers, apart from public works projects. Overtime comes from the federal FLSA, which requires time and a half after ${F.otWeeklyHours} hours in a workweek for non-exempt employees. Wyoming has no daily overtime, so long shifts only earn overtime once the weekly total passes ${F.otWeeklyHours}. Complaints about unpaid overtime go to the U.S. Department of Labor.` },
    { q: 'Can a Wyoming employer keep part of my tips?', a: `No. Wyoming statute says tips and gratuities received by an employee are the sole property of that employee and cannot be paid in whole or in part to the employer or any other person. The employer can use tips to reach the minimum wage by paying a cash wage of ${rate$(cash)}, but it must add the difference whenever wage plus tips fall below ${rate$(mw)} an hour.` },
    { q: 'When is my final paycheck due in Wyoming?', a: 'No later than the employer\'s next regularly scheduled payday, whether you quit or were discharged. Wyoming does not require a faster payment for a firing, as some states do. Unused vacation is owed only if your employer agreed to a vacation plan that promises it, because state law neither requires vacation nor its payout. The Department of Workforce Services, Labor Standards, accepts wage claims.' },
  ],
  related: ['state:montana', 'state:colorado', 'state:utah', 'state:idaho', 'state:south-dakota', 'overtime-laws-by-state'],
});
