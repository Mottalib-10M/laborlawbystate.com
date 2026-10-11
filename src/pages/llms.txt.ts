/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES, STATE_PAGES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS, stateId } from '../lib/topics';
import { stateRef } from '../data/states';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Employment law of the 50 US states and DC in 2026, one page per state: minimum wage with every dated change (January 1, July 1, September 30) and announced 2027 rates, city minimum wages, tipped cash wage, overtime thresholds and the state salary test for exempt jobs, paid sick leave, paid family leave programs, final paycheck deadlines and vacation payout, meal and rest breaks, right-to-work and at-will status. Federal rules (FLSA, FMLA, ACA full time, CCPA garnishment, WARN) from the Department of Labor and eCFR. Every state value links to the state agency page it was read on, with the date. Calculators run in the browser. General information, not legal advice. Published by Radif Partners. Last updated ${LAST_UPDATED}.`,
    '',
    `- [Home: labor laws by state](${SITE_URL}${route('home', 'en')})`,
    ...GROUPS.flatMap((g) => { const xs = PAGES.filter((p) => p.group === g.id); return xs.length ? ['', `## ${g.label}`, ...xs.map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`)] : []; }),
    '',
    '## Labor laws by state',
    `- [All states](${SITE_URL}${route('states', 'en')})`,
    ...STATE_PAGES.map((s) => `- [${stateRef(s.slug).name}](${SITE_URL}${route(stateId(s.slug), 'en')}): ${s.intro}`),
    '',
    '## About',
    `- [How we calculate](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
