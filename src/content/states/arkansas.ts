import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, tippedCash, otCalc, fullTimeAt, rate$, usd, day, F, FM } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('arkansas');
const now = mwNow('arkansas');
const since = S.minWage.rates2026[0].from;
const cash = tippedCash('arkansas')!;
const year = fullTimeAt(now).annual;
const fedYear = fullTimeAt(F.minWage).annual;
const claim = S.notes.find((n) => n.text.includes('wage claims'))!.text;
const claimMax = Number(claim.match(/\$([\d,]+) or less/)![1].replace(/,/g, ''));
const payMax = Number(claim.match(/earning \$([\d,]+) a year/)![1].replace(/,/g, ''));
const ot = otCalc('arkansas', 14, 10, 5);
const owed = 1200;

export default defineStatePage({
  slug: 'arkansas',
  title: `Arkansas Minimum Wage 2026: ${rate$(now)} for Firms With 4+ Staff`,
  description: `Arkansas in 2026: ${rate$(now)} an hour at employers with 4 or more workers (${usd(year)} a year full time), ${rate$(cash)} for tipped staff, and double wages for late final pay.`,
  intro: 'Arkansas pays well above the federal floor, but only at businesses with four or more employees, and it punishes a late final paycheck by doubling it.',
  resume: `The Arkansas minimum wage is ${rate$(now)} an hour, the same figure since ${day(since)}, and it binds employers with four or more employees. A full-time job at that rate pays ${usd(year)} a year, ${usd(year - fedYear)} more than the federal floor. A business with three workers or fewer falls outside the state act and owes only the federal ${rate$(F.minWage)}, and only if the FLSA covers it. Tipped employees can start from a cash wage of ${rate$(cash)} as long as tips raise them to ${rate$(now)}, with the employer paying any shortfall. Overtime is time and a half after ${S.overtime.weeklyHours} hours actually worked in a week, with no daily rule. The state sets no paid sick leave, no paid family leave and no adult breaks. When an employer dismisses someone, the last wages are due by the next regular payday, and if they are more than seven days late after it, the employer owes double.`,
  body: (h) => `
<h2>The four-employee line</h2>
<p>The Arkansas Minimum Wage Act does not reach every workplace. It applies to employers with four or more employees, and the Labor Standards Division states that a business covered by both the state act and the FLSA must pay whichever rate is higher, which today is the state's ${rate$(now)}. A family shop with three staff is a different case: no state floor applies, and the federal ${rate$(F.minWage)} applies only if the business meets federal coverage rules. For a worker the difference over a year of full-time hours is ${usd(year - fedYear)}, so the headcount of a small employer is worth asking about before accepting a job. Employers may also apply to the Division for a reduced wage for students, using a form posted on the agency site.</p>
<h2>A late final paycheck can cost the employer double</h2>
<p>Arkansas attaches a price to delay directly in its final pay rule. When a company terminates an employee, wages are due by the next regular payday, and if payment has not arrived within seven days of that payday, the employer owes the employee double the wages due. Take a warehouse worker let go with ${usd(owed)} in earned pay: paid on time, the check is ${usd(owed)}; paid more than a week after the payday, the amount owed becomes ${usd(owed * 2)}. Vacation, sick pay and holiday pay are included only when a company policy promises them, and the Division asks for a copy of that policy with any claim.</p>
${h.mini('ptoPayout', stateArg('Arkansas'))}
<h2>Who can file a claim with the state</h2>
<p>The Labor Standards Division handles wage claims of ${usd(claimMax)} or less, filed by workers who earn ${usd(payMax)} a year or less. A larger dispute, or one from a higher earner, goes to court, where Small Claims Court can be used without an attorney. The Division decides the claims it accepts; for a larger amount, an employment lawyer can review the facts and the policy documents.</p>
<h2>Tipped pay and weekly overtime</h2>
<p>A server paid the ${rate$(cash)} cash wage who averages $6 an hour in tips reaches ${rate$(cash + 6)}, still ${rate$(Math.max(0, now - cash - 6))} short of the minimum, and the employer must make up that gap for every hour of the week. Overtime is counted on the week only. A shift lead on $14 an hour who works five 10-hour days gets ${ot.otHours} overtime hours and ${usd(ot.total)} for the week, while four 10-hour days earn no premium at all. Salaried staff face the federal test of ${usd(F.exemptWeekly)} a week, because Arkansas sets no higher level. ${h.a('overtime-laws-by-state', 'Overtime rules by state')} shows where daily overtime exists.</p>
${h.mini('tipTopUp', stateArg('Arkansas'))}
<h2>Leave and breaks</h2>
<p>Sick days and vacation depend on company policy. Job-protected leave comes from the federal FMLA, up to ${FM.weeks} unpaid weeks for eligible workers. Neither state nor federal wage law requires a meal period or a rest break for adults in Arkansas; the only break rule protects children under 16 employed in the entertainment industry.</p>`,
  faqs: [
    { q: 'Does the Arkansas minimum wage apply to small businesses?', a: `Only to employers with four or more employees. A business that size must pay at least ${rate$(now)} an hour. An employer with three or fewer workers falls outside the Arkansas Minimum Wage Act and owes the federal ${rate$(F.minWage)} only if the Fair Labor Standards Act covers it. When both laws apply, the employer must pay the higher state rate.` },
    { q: 'What happens if my employer pays my final check late in Arkansas?', a: `If you were terminated, your wages are due by the next regular payday. When the employer fails to pay within 7 days of that payday, Arkansas law says it owes you double the wages due. The Labor Standards Division accepts claims up to ${usd(claimMax)} from workers earning ${usd(payMax)} a year or less; larger cases go to court, including Small Claims Court.` },
    { q: 'How much is the tipped minimum wage in Arkansas in 2026?', a: `Employers may pay tipped employees a cash wage of ${rate$(cash)} an hour, provided tips bring total pay to at least ${rate$(now)} for each hour worked. If tips fall short in a workweek, the employer must make up the difference. This applies at employers with four or more employees covered by the state act.` },
    { q: 'Is an AR employer required to give breaks?', a: 'Not for adults. The Arkansas Department of Labor and Licensing states that neither state nor federal wage and hour laws require an employer to provide a break or a meal period. The one exception in state law covers children under 16 working in the entertainment industry, who must receive rest breaks. Any break for adults comes from company policy or a contract.' },
  ],
  related: ['state:missouri', 'state:tennessee', 'state:mississippi', 'state:louisiana', 'state:texas', 'final-paycheck-laws'],
});
