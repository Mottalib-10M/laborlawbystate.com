import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, tippedCash, otCalc, fullTimeAt, rate$, usd, F, FM } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('alabama');
const wage = mwNow('alabama');
const cash = tippedCash('alabama')!;
const year = fullTimeAt(wage).annual;
const tips = 3;
const gap = Math.max(0, wage - cash - tips);
const week = otCalc('alabama', 16, 9, 5);

export default defineStatePage({
  slug: 'alabama',
  title: `Alabama Labor Laws 2026: No State Wage Law, ${rate$(wage)} Floor`,
  description: `Alabama in 2026: no state minimum wage, so the federal ${rate$(wage)} applies (${usd(year)} a year full time), ${rate$(cash)} cash wage for tipped staff, no paid sick leave mandate.`,
  intro: 'Alabama writes almost no wage rules of its own and forbids its cities from writing any, so a worker there lives under the federal floor.',
  resume: `Alabama has no minimum wage statute, which leaves the federal Fair Labor Standards Act as the only floor: ${rate$(wage)} an hour for covered employers in 2026, or ${usd(year)} for a full year at 40 hours a week. Tipped employees can receive a cash wage of ${rate$(cash)} as long as tips lift them to ${rate$(wage)}. Overtime also comes from federal law, time and a half after ${F.otWeeklyHours} hours in a workweek, and the salary line for exempt managers is the federal ${usd(F.exemptWeekly)} a week. The state requires no paid sick days, no paid family leave and no breaks for adults. A section of the Alabama Code goes further and voids any city or county ordinance on wages, leave or benefits, so Birmingham or Montgomery cannot add a local rate. The right to work sits in the state constitution, and the Clarke-Figures Equal Pay Act bans unequal pay by sex or race for equal work.`,
  body: (h) => `
<h2>A state that leaves the field to Washington</h2>
<p>Alabama belongs to the short group of states with no general minimum wage law on the books. The practical result is that an Alabama paycheck is governed by the FLSA, enforced by the U.S. Department of Labor's Wage and Hour Division rather than by a state office. The Alabama Department of Workforce says so itself: questions on pay, unpaid wages, breaks and vacation are sent to the federal agency. A business too small to be covered by the FLSA has no legal wage floor at all, which is rare but possible for a very local firm with no interstate activity.</p>
<p>The Legislature also shut the door on local action. Section 25-7-45 of the Code states that it occupies the entire field of wages, leave and employment benefits, and any contrary ordinance has no force. That is why no Alabama city appears in ${h.a('city-minimum-wage', 'our list of city minimum wages')}.</p>
<h2>Tipped jobs at ${rate$(cash)} an hour</h2>
<p>Restaurants may use the full federal tip credit. A server who averages $${tips} an hour in tips earns ${rate$(cash + tips)} from cash wage plus tips, so the employer must add ${rate$(gap)} for every hour that week to reach ${rate$(wage)}. Over a 30-hour week that top-up is ${usd(gap * 30)}. The test runs week by week, and tips belong to the worker unless a valid pool is in place. Try your own tip average below.</p>
${h.mini('tipTopUp', stateArg('Alabama'))}
<h2>Overtime with no state layer</h2>
<p>With no Alabama overtime statute, the weekly federal threshold is the whole rule. A forklift driver paid $16 an hour who works five 9-hour days logs 45 hours, and the federal method gives ${week.otHours} hours at time and a half, for a weekly total of ${usd(week.total)}. A 10-hour day followed by short days creates no premium as long as the week stays at or under ${F.otWeeklyHours} hours. Salaried staff are exempt only if they pass the federal duties test and earn at least ${usd(F.exemptWeekly)} a week; ${h.a('exempt-vs-non-exempt', 'the exempt versus non-exempt guide')} explains the duties side.</p>
<h2>Leave, breaks and the last paycheck</h2>
<p>Paid time off is a matter of company policy in Alabama. Unpaid, job-protected leave can still come from the federal FMLA if your employer has ${FM.employerEmployees} or more employees within ${FM.radiusMiles} miles and you have worked ${FM.hours.toLocaleString('en-US')} hours in the past year. Adults have no state right to a meal or rest break; the only break rule in the Code protects 14- and 15-year-olds, who need a documented 30-minute pause after more than five continuous hours.</p>
<p>No statute sets a deadline for final wages or forces payout of unused vacation, so the employer's written policy and the next regular payday are what most workers rely on. When pay is missing, a complaint goes to the federal Wage and Hour Division, and an employment lawyer can look at whether a contract claim exists under state law.</p>
<h2>Equal pay and the wage history question</h2>
<p>Alabama does have one modern pay statute. The Clarke-Figures Equal Pay Act of 2019 forbids paying a worker less than a colleague of another sex or race for equal work, and it bars an employer from refusing to interview or hire someone who declines to share past salaries. Read with ${h.a('right-to-work-states', 'right-to-work rules')}, it is one of the few state-level protections an Alabama employee can invoke.</p>`,
  faqs: [
    { q: 'Does Alabama have its own minimum wage in 2026?', a: `No. Alabama never adopted a minimum wage law, so employers covered by the federal Fair Labor Standards Act pay at least ${rate$(wage)} an hour. Cities cannot fill the gap, because state law voids any local wage ordinance. A very small business outside federal coverage has no wage floor under Alabama law, although that situation is uncommon.` },
    { q: 'Can a city in Alabama raise its own minimum wage?', a: 'No. Section 25-7-45 of the Alabama Code reserves all regulation of wages, leave and employment benefits to the Legislature and declares contrary local rules void. The practical effect is that a cashier in Birmingham, Huntsville or Mobile is owed the same federal floor, and no local paid sick leave rule can be passed either. Any extra pay or leave has to come from the employer.' },
    { q: 'Is my employer in AL required to give me a lunch break?', a: 'Not if you are an adult. Neither Alabama law nor federal law requires a meal or rest period for workers 18 and over. Only 14- and 15-year-olds must receive a documented break of at least 30 minutes after more than five continuous hours. Any break an employer chooses to give follows its own policy, and federal rules decide whether that time is paid.' },
    { q: 'Does Alabama require employers to pay out unused vacation?', a: `No state statute requires it. Whether your unused days are paid when you leave depends on the employer's written policy or your contract, so check the handbook before your last day. Federal law is silent on vacation too. If a policy promises payout and the money does not arrive, the claim is a contract matter that a lawyer can assess.` },
  ],
  related: ['state:mississippi', 'state:florida', 'state:georgia', 'state:tennessee', 'tipped-minimum-wage', 'right-to-work-states'],
});
