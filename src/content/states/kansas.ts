import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('kansas');
const mw = mwNow('kansas');
const ks = S.overtime.weeklyHours!;
const fed = F.otWeeklyHours;
const tip = S.minWage.tipped.cashWage!;
const year = fullTimeAt(mw).annual;
const rate = 18, hours = 48;
const fedWeek = rate * fed + rate * F.otMultiplier * (hours - fed);
const ksWeek = rate * ks + rate * F.otMultiplier * (hours - ks);
const held = 1500;

export default defineStatePage({
  slug: 'kansas',
  title: `Kansas Wage and Overtime Laws 2026: ${fed} or ${ks} Hours, ${rate$(mw)}`,
  description: `Kansas employment law in 2026: ${rate$(mw)} an hour (${usd(year)} a year full time), federal overtime after ${fed} hours, a state rule at ${ks}, and no local wage or leave laws.`,
  intro: `Kansas has its own overtime threshold of ${ks} hours, yet most Kansans are paid overtime after ${fed} because federal law covers their jobs.`,
  resume: `Most Kansas workers earn overtime after ${fed} hours a week, under the federal Fair Labor Standards Act; the state's own ${ks}-hour threshold applies only to jobs the FLSA does not cover. The minimum wage follows the same split. Kansas law sets ${rate$(mw)} an hour, but only for employers outside the FLSA, and federal law already requires ${rate$(F.minWage)} everywhere else, so the result is the same: ${usd(year)} for a full-time year in 2026, with no increase announced for 2027. Tipped employees may receive ${rate$(tip)} in cash if tips fill the gap. Since 2013, cities and counties have been barred from setting a higher wage or requiring paid or unpaid leave, so no Kansas city has a minimum wage or sick leave ordinance. Final wages are due by the next regular payday after you quit or are discharged, and a willful delay can add a penalty of 1 percent a day.`,
  body: (h) => `
<h2>Forty hours or forty-six: which number is yours</h2>
<p>Kansas is one of the few states whose overtime statute starts later than federal law. K.S.A. 44-1204 requires time and a half only for hours beyond ${ks} in a workweek. The statute applies solely to employees not covered by the federal overtime rules, and the FLSA reaches most of the workforce: any business with ${usd(F.enterpriseSales)} or more in annual sales, plus workers at smaller firms whose own work involves interstate commerce. If you are covered by the FLSA, ${fed} hours is your number, and the stricter rule wins.</p>
<p>The difference is real for the small group left outside. A worker paid $${rate} an hour for a ${hours}-hour week earns ${usd(fedWeek)} under the federal rule and ${usd(ksWeek)} under the Kansas rule alone, a gap of ${usd(fedWeek - ksWeek)} in a single week. Salaried staff face the federal ${usd(F.exemptWeekly)} weekly threshold; Kansas adds none of its own. ${h.a('overtime-laws-by-state', 'Overtime rules in other states')} show how rare a ${ks}-hour line is.</p>
<h2>Who the state wage law leaves out</h2>
<p>The Kansas Minimum Wage and Maximum Hours Law excludes any employer subject to the FLSA, and it also lists its own exclusions, including agricultural and domestic workers and people aged 18 or younger who work occasionally or part time. For nearly everyone the controlling rate is the federal ${rate$(F.minWage)}. A restaurant can pay a tipped server ${rate$(tip)} as long as tips bring the hour to ${rate$(mw)}; if they do not, the employer must make up the difference. Not sure which law covers your job? The Wage and Hour Division of the U.S. Department of Labor answers coverage questions for free, and an employment lawyer can look at the facts of a disputed case.</p>
<h2>No city can go further</h2>
<p>K.S.A. 12-16,130, passed in 2013, stops any city, county or local unit from requiring employers to pay more than the state or federal minimum or to provide leave from work beyond what state or federal law requires. That rules out a local minimum wage or a local sick leave ordinance anywhere in the state. Sick days in Wichita, Topeka or Overland Park therefore depend on the employer's policy, and the federal FMLA remains the main source of job-protected, unpaid leave for eligible workers.</p>
${h.mini('sickAccrual', stateArg('Kansas'))}
<h2>The penalty for holding back a final check</h2>
<p>Whether an employee quits, resigns or is discharged, earned wages are due no later than the next regular payday. When an employer willfully fails to pay, Kansas law adds a penalty of 1 percent of the unpaid wages for each day after the eighth day, capped at 100 percent of the wages. On ${usd(held)} held back, that is ${usd(held * 0.01)} a day, and the cap is reached at ${usd(held)}. Whether a delay was willful is decided in a wage claim, not by the worker or the employer alone. ${h.a('final-paycheck-laws', 'Final paycheck rules by state')} compare the deadlines.</p>`,
  faqs: [
    { q: 'Is overtime in Kansas after 40 or 46 hours?', a: `For most workers it is after ${fed} hours, because the federal Fair Labor Standards Act covers their employer or their work. The Kansas ${ks}-hour threshold in K.S.A. 44-1204 applies only to employees the FLSA does not cover, such as some staff of very small local businesses. When both could apply, the federal ${fed}-hour rule is the one that protects you.` },
    { q: 'Can a Kansas city set its own minimum wage?', a: `No. Since 2013, K.S.A. 12-16,130 has barred cities, counties and other local governments from requiring employers to pay more than the state or federal minimum wage. The same law stops them from requiring paid or unpaid leave beyond state or federal law. Every Kansas worker therefore has the same ${rate$(mw)} floor and no local sick leave mandate.` },
    { q: 'What is the penalty for a late final paycheck in KS?', a: 'Final wages are due by the next regular payday. If the employer willfully withholds them, Kansas law imposes a penalty of 1 percent of the unpaid wages for each day the failure continues after the eighth day, up to a maximum equal to 100 percent of the unpaid wages. A wage claim with the Kansas Department of Labor is the usual route.' },
  ],
  related: ['state:missouri', 'state:nebraska', 'state:oklahoma', 'state:colorado', 'overtime-laws-by-state', 'paid-sick-leave-by-state'],
});
