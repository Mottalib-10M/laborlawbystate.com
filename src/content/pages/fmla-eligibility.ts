import { definePage } from '../../lib/page-types';
import { FM, STATES, pflStates, pflComing, hoursCheck, names, num } from '../../lib/kit';

const paying = pflStates();
const pfl = [...paying, ...pflComing()];
const weeklyNeed = FM.hours / 52;
const short24 = hoursCheck(24);
const rows = [16, 20, 24, 25, 30, 40].map((h) => {
  const full = hoursCheck(h);
  const gap = hoursCheck(h, 48);
  return [`${h} hours`, num(full.yearly), full.fmlaHours ? 'Met' : `${num(FM.hours - full.yearly)} short`, num(gap.yearly), gap.fmlaHours ? 'Met' : `${num(FM.hours - gap.yearly)} short`];
});

export default definePage({
  id: 'fmla-eligibility',
  group: 'leave',
  kind: 'guide',
  order: 20,
  slug: 'fmla-eligibility',
  nav: 'FMLA eligibility',
  card: `The months, hours and worksite tests one by one, with the schedules that fall just short.`,
  title: `FMLA Eligibility 2026: ${num(FM.hours)} Hours, ${FM.months} Months, ${FM.worksiteEmployees} Workers`,
  description: `FMLA eligibility in 2026: ${FM.months} months on the job, ${num(FM.hours)} hours worked in the last year and ${FM.worksiteEmployees} coworkers within ${FM.radiusMiles} miles. Check your own hours and schedule here.`,
  h1: 'FMLA eligibility: the tests you must pass before leave starts',
  intro: 'Job-protected leave under the FMLA depends on three numbers about you and one about your employer. Here is how each one is measured.',
  resume: `You are eligible for FMLA leave in 2026 if you pass three tests on the day the leave begins: you have been employed by the same employer for at least ${FM.months} months, you worked at least ${num(FM.hours)} hours for that employer during the 12 months right before the leave, and at least ${FM.worksiteEmployees} employees of the employer work at or within ${FM.radiusMiles} miles of your worksite. The employer must also be covered: a private business with ${FM.employerEmployees} or more employees in each of ${FM.employerWorkweeks} or more workweeks this year or last, or any public agency or school. The ${FM.months} months do not have to be consecutive, but time before a break in service of ${FM.breakInServiceYears} years or more usually drops out. The hours test counts only time actually worked, so a schedule averaging ${num(weeklyNeed, 1)} hours a week over a full year is the floor. Pass all of them and you can take up to ${FM.weeks} workweeks of unpaid leave with your job and health coverage protected.`,
  mini: 'fmlaHours',
  body: (h) => `
<h2>Four questions, asked in this order</h2>
<p>Human resources departments tend to run the checks the same way. First, is the employer covered at all? A private company enters the law once it has ${FM.employerEmployees} or more people on the payroll for each working day in ${FM.employerWorkweeks} or more calendar weeks, in the current or the previous calendar year. Public employers and elementary and secondary schools are covered whatever their size. Second, has the employee been with this employer for ${FM.months} months? Third, did the employee put in ${num(FM.hours)} hours over the past year? Fourth, does the worksite have ${FM.worksiteEmployees} employees within ${FM.radiusMiles} miles? A no at any step ends the inquiry under federal law, although a state statute may still apply. The regulation that sets the three personal tests is ${h.src('cfr825110', '29 CFR 825.110')}, and the eligibility notice your employer must give you is described in ${h.src('cfr825300', 'section 825.300')}.</p>
<p>Timing matters. Eligibility is judged as of the date the FMLA leave is to start, not the date you ask. Someone who reaches ${FM.months} months during a stretch of non-FMLA leave becomes eligible on that date, and the remainder of the absence can then count as FMLA leave if the reason qualifies.</p>
<h2>How the ${num(FM.hours)} hours are counted</h2>
<p>The hours test uses the Fair Labor Standards Act idea of hours worked. Paid vacation, holidays, sick days and other paid time off do not count, because you were not working. Overtime hours do count. So does time that should have been paid but was not, such as unrecorded work before a shift: the regulation says the result is not limited by payroll records that understate real hours. If the employer keeps no accurate record of your time, which is common for salaried exempt staff, the employer carries the burden of showing you fell short. For full-time teachers who grade papers at home, the rule says this plainly.</p>
<p>Spread over 52 weeks, ${num(FM.hours)} hours is about ${num(weeklyNeed, 1)} hours a week. That makes the part-time edge very thin. A worker on exactly 24 hours a week every week of the year reaches ${num(short24.yearly)} hours, ${num(FM.hours - short24.yearly)} short of the line, and one unpaid week off pushes the total further away. The table shows common schedules for a full year and for a year with four weeks of unpaid time away.</p>
${h.table(['Usual schedule', 'Hours in 52 weeks', 'Result', 'Hours in 48 weeks', 'Result'], rows, `Hours test of the FMLA (${num(FM.hours)} hours in the 12 months before leave)`, ['l', 'r', 'l', 'r', 'l'])}
<p>Returning service members get special treatment: under the Uniformed Services Employment and Reemployment Rights Act, the hours you would have worked during military service are added to the hours you actually worked. Airline flight crews have their own hours rule in a separate section of the regulations.</p>
<h2>The ${FM.months}-month rule and breaks in service</h2>
<p>The months need not be in a row. Seasonal staff who return every summer, or someone rehired after a few years elsewhere, can add earlier periods with the same employer. Any week in which you were on the payroll, even for one day or while on paid leave, counts as a week of employment, and for irregular or casual work 52 weeks are treated as ${FM.months} months. The limit is the break in service. Employment before a gap of ${FM.breakInServiceYears} years or more is normally ignored, with two exceptions written into the rule: the gap was caused by military service covered by USERRA, or a written agreement, such as a union contract, showed the employer intended to rehire you. An employer may choose to count older service anyway, but then it has to do so for everyone in the same situation.</p>
<h2>The worksite count that trips up branch employees</h2>
<p>The ${FM.worksiteEmployees}-employee test looks at the place you report to and every site of the same employer within ${FM.radiusMiles} miles, measured in surface miles along public roads by the shortest route. A retail chain with thousands of workers can still leave a clerk at an isolated store outside the FMLA if fewer than ${FM.worksiteEmployees} colleagues work within that radius. Employees with no fixed site, such as drivers, construction crews and traveling salespeople, belong to the home base they report to or receive assignments from. The count is taken when you give notice of the need for leave, and once you are found eligible for that notice, a later drop in headcount does not take the leave away. The regulation gives the example of a company with 60 employees in August that expects to fall to 40 by December: an employee who gives notice in August for leave in December keeps the protection.</p>
${h.box('A quick self-check', `<p>Count only weeks you actually worked, multiply by your usual weekly hours and compare the total with ${num(FM.hours)}. If you work overtime in busy months, add those hours too. Your employer has to tell you within five business days of your request whether you are eligible, and if not, at least one reason why.</p>`)}
<h2>If you fall short, look at state law next</h2>
<p>Failing the federal test does not always leave you without protection. Several states have family leave statutes that reach smaller employers or require less service, and state paid leave insurance programs set their own, usually lighter, conditions based on wages earned rather than hours worked for one employer. Of the ${STATES.length} jurisdictions covered on this site, ${pfl.length} have enacted a paid family leave program and ${paying.length} pay benefits on this site's check date: ${names(paying)}. ${h.a('paid-family-leave-by-state', 'The state-by-state comparison')} shows the weeks and weekly maximums. Accrued paid sick leave can cover shorter absences in states with a ${h.a('paid-sick-leave-by-state', 'sick leave law')}, and the ${h.a('fmla', 'main FMLA page')} explains what the leave itself protects once you qualify. When the facts are close, such as disputed hours or a contested worksite count, the Wage and Hour Division decides complaints, and an employment lawyer can look at your records.</p>`,
  faqs: [
    { q: 'Do paid holidays and vacation count toward the FMLA 1,250 hours?', a: `No. The hours test counts only time actually worked under the Fair Labor Standards Act definition, so paid vacation, holidays, sick days and other paid time off are left out. Overtime hours are included, and so is work that went unrecorded. If your employer keeps no accurate time records, it has to prove you did not reach ${num(FM.hours)} hours.` },
    { q: 'Can I get FMLA leave after working 6 months?', a: `Not under the federal law. You need ${FM.months} months of employment with the employer, although they do not have to be consecutive, and earlier stints count unless they came before a break of ${FM.breakInServiceYears} years or more. A state family leave law or a state paid leave program may protect you sooner, so check the rule in the state where you work.` },
    { q: 'Are part-time workers eligible for FMLA?', a: `Yes, if they meet the same tests as everyone else. The usual obstacle is the hours rule: ${num(FM.hours)} hours over the 12 months before leave, about ${num(weeklyNeed, 1)} hours a week across a full year. A part-time employee on 25 hours a week with few unpaid weeks off generally passes. One on 20 hours a week does not.` },
    { q: 'Does the 50 employee rule count workers at other locations?', a: `It counts every employee of the same employer working within ${FM.radiusMiles} miles of your worksite, measured in surface miles by the shortest route, based on the people kept on the payroll. Locations farther away are left out even if the company is large nationally. The headcount is taken when you give notice of the need for leave, and a later drop does not end leave already approved.` },
    { q: 'When does my employer have to tell me if I qualify for FMLA?', a: 'Within five business days after you ask for leave or after the employer learns the absence may be for an FMLA reason. The eligibility notice must say whether you qualify and, if you do not, give at least one reason. A separate designation notice later tells you whether the specific leave will count against your FMLA entitlement.' },
  ],
  related: ['fmla', 'paid-family-leave-by-state', 'paid-sick-leave-by-state', 'part-time-hours', 'full-time-hours'],
  sources: ['cfr825110', 'cfr825300', 'fs28', 'dolFmla', 'dolSickLeave'],
  extraSources: [
    { name: '29 CFR 825.104: covered employer (50 employees in 20 or more workweeks, all public agencies)', url: 'https://www.ecfr.gov/current/title-29/section-825.104' },
    { name: '29 CFR 825.111: counting 50 employees within 75 miles (surface miles, payroll count)', url: 'https://www.ecfr.gov/current/title-29/section-825.111' },
  ],
});
