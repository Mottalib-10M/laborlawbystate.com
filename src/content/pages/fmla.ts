import { definePage } from '../../lib/page-types';
import { FM, pflStates, names, num } from '../../lib/kit';
import { pflArg } from '../../lib/mini-args';

const pfl = pflStates();

export default definePage({
  id: 'fmla',
  group: 'leave',
  kind: 'pillar',
  order: 10,
  slug: 'fmla',
  nav: 'FMLA leave',
  card: `Who qualifies, how many weeks are left and which states pay during the leave.`,
  title: `FMLA 2026: ${FM.weeks} Weeks of Leave, Eligibility and Weeks Left`,
  description: `FMLA in 2026: up to ${FM.weeks} weeks of job-protected leave if you have ${FM.months} months and ${num(FM.hours)} hours. Check eligibility, weeks left and your state's paid leave plan.`,
  h1: 'FMLA: who qualifies, how much leave and how it is paid',
  intro: 'The Family and Medical Leave Act protects your job and your health insurance during a long absence, but it does not pay you. The calculator runs its tests on your situation.',
  resume: `The Family and Medical Leave Act gives an eligible employee up to ${FM.weeks} workweeks of unpaid, job-protected leave in a 12-month period, or up to ${FM.militaryCaregiverWeeks} workweeks to care for a servicemember with a serious injury or illness. Three tests decide eligibility: you have worked for the employer for at least ${FM.months} months, you worked at least ${num(FM.hours)} hours in the 12 months before the leave, and at least ${FM.worksiteEmployees} employees work for the employer within ${FM.radiusMiles} miles of your worksite. The employer itself must be covered: private companies with ${FM.employerEmployees} or more employees in ${FM.employerWorkweeks} or more workweeks, and every public agency and school. During the leave your group health coverage continues on the same terms, and you return to the same or an equivalent job. The leave is unpaid; ${pfl.length} jurisdictions run insurance programs that replace part of your pay.`,
  tool: 'fmla',
  toolProps: { state: 'new-york' },
  body: (h) => `
<h2>The reasons that qualify</h2>
<p>The law lists them. You can take FMLA leave for the birth of a child and to bond with the newborn, for the placement of a child for adoption or foster care, to care for a spouse, child or parent with a serious health condition, for your own serious health condition when it keeps you from doing the essential functions of your job, and for qualifying exigencies when a spouse, child or parent is on covered active duty. Bonding leave must be used within 12 months of the birth or placement. A serious health condition is more than a cold: it involves an overnight stay in a hospital, or continuing treatment by a health care provider, such as a period of incapacity of more than three days with follow-up care, a chronic condition like asthma or diabetes, or pregnancy. ${h.a('fmla-eligibility', 'The eligibility guide')} walks through each test with examples.</p>
<h2>How the ${FM.weeks} weeks are counted</h2>
<p>The entitlement is measured in workweeks, so it follows your normal schedule: an employee who works three days a week and takes a whole week off uses one week. Leave can be taken in one block, intermittently in separate blocks, or as a reduced schedule, for example half days during chemotherapy. Your employer chooses one of four ways to define the 12-month period: the calendar year, a fixed year such as a fiscal year, a period measured forward from your first day of leave, or a rolling period measured backward from each day you use leave. With the rolling method, weeks come back gradually as old absences fall out of the 12-month window.</p>
<h2>Pay during FMLA leave</h2>
<p>Federal law does not pay you. You may choose, or your employer may require you, to use accrued paid leave at the same time, so that vacation or sick days run alongside the FMLA clock. Short-term disability insurance from your employer can also pay during your own illness or after childbirth. In ${names(pfl)}, a state insurance program pays a share of your wages, often for longer than ${FM.weeks} weeks when family and medical leave are added together.</p>
${h.mini('pflState', pflArg('New Jersey'))}
<h2>What your employer must do</h2>
<p>An employer covered by the law must post a notice, tell you within five business days whether you are eligible once you ask for leave or once it learns the absence may qualify, and designate the leave as FMLA leave in writing. It can ask for a medical certification, and you generally have 15 calendar days to return it. It must keep your group health plan going as if you were working, and you keep paying your usual share of the premium. On your return you get the same job or one with equivalent pay, benefits and duties. Interfering with FMLA rights or retaliating against someone who uses them is unlawful, and complaints go to the Wage and Hour Division of the Department of Labor.</p>
<h2>When you are not eligible</h2>
<p>New hires, part-time workers under ${num(FM.hours)} hours a year and people at small employers are the usual cases. State laws can step in: several states protect leave at smaller employers or after shorter service, and state paid leave programs usually protect your job even when the FMLA does not. Check your ${h.a('states', 'state page')} for the rule where you work.</p>`,
  faqs: [
    { q: 'Is FMLA leave paid?', a: `No. FMLA leave is unpaid under federal law. You can use accrued vacation, sick leave or PTO during it, and your employer can require that. In ${pfl.length} jurisdictions a state insurance program replaces part of your wages, and an employer short-term disability plan may also pay during your own illness or recovery from childbirth.` },
    { q: 'How many hours do I need to work to qualify for FMLA?', a: `You need ${num(FM.hours)} hours of service in the 12 months right before the leave starts, which averages about ${num(FM.hours / 52, 1)} hours a week. Only hours actually worked count; paid vacation, holidays and sick days do not. You also need ${FM.months} months with the employer and a worksite with ${FM.worksiteEmployees} employees within ${FM.radiusMiles} miles.` },
    { q: 'Can I be fired while on FMLA leave?', a: 'Not because you took the leave. Your employer must restore you to the same or an equivalent job when you return. You have no greater protection than if you had kept working, though: if your position would have been eliminated in a genuine layoff anyway, the FMLA does not save it. Retaliation for using FMLA leave is illegal and can be reported to the Wage and Hour Division.' },
    { q: 'Can I take FMLA leave a few hours at a time?', a: 'Yes, when it is medically necessary, for example for treatments, flare-ups of a chronic condition or prenatal visits. You can also work a reduced schedule. For bonding with a new child, intermittent leave needs your employer to agree. Hours of intermittent leave are deducted from your 12 weeks in proportion to your normal workweek.' },
    { q: 'Does FMLA cover caring for a grandparent or sibling?', a: 'Not under the federal law. The FMLA covers a spouse, a son or daughter, and a parent, including someone who stood in the place of a parent when you were a child. Several state family leave laws and paid leave programs cover a wider circle, such as grandparents, grandchildren, siblings and domestic partners, so the state rule may help where the federal one does not.' },
    { q: 'Do both parents get 12 weeks of FMLA for a new baby?', a: `Each eligible parent has their own ${FM.weeks} weeks. If both work for the same employer and are married, the employer can limit their combined bonding leave to ${FM.weeks} weeks in total, although each parent keeps their remaining weeks for other reasons, such as a serious health condition. Parents working for different employers each get the full entitlement.` },
  ],
  related: ['fmla-eligibility', 'paid-family-leave-by-state', 'paid-sick-leave-by-state', 'full-time-hours', 'state:california', 'state:new-york'],
  sources: ['dolFmla', 'fs28', 'cfr825110', 'cfr825200', 'cfr825115', 'cfr825300', 'cfr825305', 'cfr825201'],
});
