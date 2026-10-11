import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, FM, fullTimeAt, otCalc } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('georgia');
const fed = mwNow('georgia');
const own = S.minWage.headline;
const ot = otCalc('georgia', 16, 10, 5);

export default defineStatePage({
  slug: 'georgia',
  title: `Georgia Minimum Wage 2026: ${rate$(fed)}, Not the State's $5.15`,
  description: `Georgia labor laws in 2026: the federal ${rate$(fed)} minimum wage overrides the state's $5.15 for most jobs, federal overtime rules apply, no final pay deadline.`,
  intro: 'Georgia still has its own minimum wage on the books, below the federal one, and leaves leave, breaks and final pay to employers.',
  resume: `Almost every Georgia worker is owed ${rate$(fed)} an hour, the federal minimum wage, even though Georgia's own statute still names a lower figure of $5.15. The federal Fair Labor Standards Act covers most employers, and where both laws apply the higher rate wins, so the state number only matters for the rare jobs outside federal coverage. Full time at ${rate$(fed)} pays ${usd(fullTimeAt(fed).annual)} a year. Tipped workers may receive a cash wage of ${rate$(F.tippedCash)} if tips bring them to the federal minimum. Georgia has no overtime law of its own, no paid sick leave or paid family leave requirement, no break law and no statute fixing when a final paycheck is due. It is a right-to-work state and an at-will state. For most of what an hourly worker asks about, the answer in Georgia is federal law or the employer's written policy.`,
  body: (h) => `
<h2>Two minimum wages, one that counts</h2>
<p>The Georgia minimum wage law dates from a time when ${rate$(own)} meant something, and the legislature has never raised it. The state law also excludes many workers, tipped employees among them. In practice the federal minimum of ${rate$(fed)} applies to any employer covered by the FLSA, which, under ${h.src('fs14', 'the Department of Labor coverage rules')}, includes every business with annual sales of at least ${usd(F.enterpriseSales)} and, whatever the size of the business, any worker whose job regularly involves commerce between states. If someone offers you less than ${rate$(fed)}, the employer should be able to explain why federal law does not reach the job; very few can.</p>
${h.mini('stateCompare', stateArg())}
<h2>Overtime is the federal rule</h2>
<p>Hours over ${F.otWeeklyHours} in a workweek are paid at time and a half under the FLSA, and nothing in Georgia law adds a daily threshold. A forklift operator earning $16 who works five 10-hour days has 10 overtime hours and a gross week of ${usd(ot.total)}. The exempt salary level is the federal ${usd(F.exemptWeekly)} a week. ${h.a('overtime-laws-by-state', 'Overtime rules by state')} shows how much a daily rule would add in states that have one.</p>
<h2>When the job ends</h2>
<p>No Georgia statute tells an employer how quickly to hand over the last paycheck, and federal law sets no deadline either. The Georgia Department of Labor points workers with unpaid wages to small claims court. Unused vacation is paid only if the employer's policy or your contract promises it, because no law requires vacation in the first place. Keep the handbook and any offer letter: they are the documents a court would read. Minimum wage and overtime owed under federal law can also be claimed through the Wage and Hour Division of the U.S. Department of Labor, which takes complaints without charge and does not need a lawyer to open a case.</p>
<h2>Who falls outside both laws</h2>
<p>The workers Georgia's ${rate$(own)} could still reach are those of small, purely local businesses whose work never crosses state lines, a narrow and shrinking group now that card payments, deliveries and online orders tie most shops to interstate commerce. The state statute also leaves out several categories by name. If you are in doubt about coverage, the federal fact sheet on coverage is the place to start, and the employer carries the burden of showing an exemption.</p>
<h2>Leave, breaks and unions</h2>
<p>Georgia does not require paid sick days, paid family leave or meal and rest breaks for adults. Federal FMLA leave, up to ${FM.weeks} unpaid weeks, is available to workers at employers with ${FM.employerEmployees} or more employees who meet the service and hours tests. Georgia is a right-to-work state, which the state labor department describes narrowly: it protects you from losing your job for refusing to join or pay a union, not from being let go for other lawful reasons under the at-will rule.</p>`,
  faqs: [
    { q: 'Is the Georgia minimum wage $5.15 or $7.25?', a: `For nearly all workers it is ${rate$(fed)}, the federal minimum wage. Georgia's statute still sets $5.15, but federal law covers most employers and the higher rate applies when both laws do. The state figure matters only for the few jobs outside federal coverage, and Georgia's law itself exempts many of those workers.` },
    { q: 'How long does a Georgia employer have to pay a final paycheck?', a: 'Georgia has no statute setting a deadline for final wages, and federal law does not set one either. In practice the last check usually arrives on the next regular payday under the employer policy. If wages are not paid, the Georgia Department of Labor directs workers to file a claim in small claims court, or to contact the U.S. Department of Labor for minimum wage and overtime.' },
    { q: 'Do Georgia employers have to give sick days?', a: `No. Georgia has no law requiring private employers to provide paid sick leave. Sick days depend on the employer's policy. If you face a serious health condition, the federal FMLA may protect your job for up to ${FM.weeks} weeks without pay, provided your employer has ${FM.employerEmployees} or more employees and you meet the service and hours requirements.` },
  ],
  related: ['state:florida', 'state:alabama', 'state:south-carolina', 'state:tennessee', 'minimum-wage-by-state', 'right-to-work-states'],
});
