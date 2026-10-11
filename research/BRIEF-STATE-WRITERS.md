# Brief: writing state pages (2026-10-11)

Site: ~/Documents/GitHub/a-publier/Mottalib-10M/us-labor-law. Read FIRST and follow exactly: CONTRIBUTING-PAGES.md
(section "Champs d'une page d'État" and the rules on figures, tone and uniqueness), the models
src/content/states/new-york.ts and src/content/states/california.ts (structure only, never their phrases or their
section titles), src/components/StatePage.astro (what the page already renders from data: do not repeat those
blocks in prose), src/lib/kit.ts, src/lib/mini-args.ts and src/lib/minis/*.ts. For each state run
`python3 scripts/sync-states.py` then read its fact file src/data/states/<slug>.json in full (values, notes,
uncertain list). The prose may only state what the file supports, or what an official page you read yourself
supports (cite it in the body with h.ext(url, text)); anything listed in `uncertain` must not be asserted. If a state's
file does not exist yet in src/data/states/, skip that state and say so.

Each page src/content/states/<slug>.ts:
- title 50-60 chars, starts with the state name, contains 2026; vary the pattern between states;
- description 150-160 chars with 2026 and a computed figure;
- intro: one sentence;
- resume: ONE paragraph of 120+ words (130-170), first sentence = the message, figures through the kit;
- body: 450-650 words, 3-5 <h2> in your own words, opening on what is rarest about the state; at least one mini
  with the state preselected (stateArg('Ohio'), cityArg(), pflArg('Ohio')); choose the mini that matches the rare
  point (raiseTimeline, tipTopUp, sickAccrual, shiftBreaks, ptoPayout, exemptCheck, cityCompare, pflState, atWillState,
  rtwState, stateCompare); one worked example computed with the kit (otCalc, fullTimeAt, sickYear...);
- faqs: 3-5 real questions with the state name (or abbreviation) in each, answers 45-85 words, unique site-wide
  (grep -rh "q: '" src/content to check);
- related: 3-6 ids: neighbor states 'state:<slug>', topic ids of src/lib/planned.ts.
Every official figure through the kit (mwNow, mw2027, mwOn, rate$, usdx, sd(slug)...), never typed by hand except
example hypotheses (a $20 wage, a 45-hour week). Banned: em dash, Moreover, Additionally, Furthermore, crucial,
landscape, delve, seamless, robust, empower, "navigate the", "it's important to note", "whether you're". No legal
advice for an individual case. Do not reuse sentences between your own pages: each state needs its own vocabulary.

Validate: python3 scripts/sync-states.py && ALLOW_PLANNED=1 PAGE_FILES=state:<a>,state:<b>,... npx vitest run tests/pages.test.ts
until all pass. Edit no other file. No git, no Chrome, no browser automation. Report in under 10 lines: files written,
states skipped, anything in the data that looked doubtful.
