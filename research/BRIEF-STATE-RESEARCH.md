# State labor-law fact sheet: research brief (2026-10-11)

You collect VERIFIED facts for a state-by-state US employment-law reference site (general information, not legal advice).
Today is **2026-10-11**. Many rules changed in 2025-2026 (ballot measures, repeals, July 1 and September 30 increases,
2027 rates announced in autumn 2026). **Never rely on memory**: every value must come from a page you actually read today.

## Sources allowed
- The state's own sites: labor department / wage-and-hour division, paid leave agency, state legislature / code, governor press release.
- U.S. Department of Labor (dol.gov) tables only as a cross-check (WebFetch works on dol.gov; curl gets 403).
- City / county government sites for local minimum wages.
- NOT allowed as a source: law firms, payroll vendors, minimum-wage.org, paycor, ADP, Wikipedia, news (news only to find the official page).

Tools (ALWAYS add `--max-time 20` to curl; never run a command that can hang; if a site blocks or hangs, use WebFetch once, then move on and note it in `uncertain`): `curl -sL --max-time 20 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/129 Safari/537.36" <url>` (pipe through `python3 -c` / `sed` to strip HTML), or WebFetch. WebSearch quota is shared and may be exhausted: fallback `curl -s 'https://html.duckduckgo.com/html/?q=<query>&kl=us-en'` and read `.result__url`. PDFs: `curl -o x.pdf` then `pdftotext` if available, or WebFetch.
Work in your scratch dir for downloads; do not write anywhere except the output files named below.

## Output: one file per state
`~/Documents/GitHub/a-publier/Mottalib-10M/us-labor-law/research/states/<slug>.json` (slug = lowercase, hyphens: `new-york`, `district-of-columbia`).
Valid JSON, exactly this shape. Every `source` = `{"url": "...", "quote": "short verbatim excerpt proving the value", "accessed": "2026-10-11"}`.
Use `null` when a thing does not exist in that state (e.g. no state meal-break law for adults). If you could NOT verify something, set it to `null` and add an explanation to `uncertain` — never guess.

```json
{
  "slug": "new-york", "name": "New York", "abbr": "NY",
  "agency": {"name": "New York State Department of Labor", "url": "https://dol.ny.gov/"},
  "minWage": {
    "rates2026": [ {"from": "2026-01-01", "rate": 17.00, "area": "New York City, Long Island and Westchester", "note": ""},
                   {"from": "2026-01-01", "rate": 16.00, "area": "Rest of state", "note": ""} ],
    "headline": 16.00,
    "headlineArea": "Rest of state",
    "federalApplies": false,
    "rates2027": [ {"from": "2027-01-01", "rate": 17.60, "area": "...", "note": "officially announced on ..."} ],
    "smallEmployer": null,
    "tipped": {"cashWage": 11.35, "tipCreditAllowed": true, "note": "food service workers, rest of state"},
    "other": "youth / training / opportunity wage, or null",
    "source": {"url": "", "quote": "", "accessed": "2026-10-11"}
  },
  "localMinWages": [ {"name": "Seattle", "rate": 21.30, "from": "2026-01-01", "note": "", "source": {...}} ],
  "overtime": {"weeklyHours": 40, "dailyHours": null, "doubleTime": null, "seventhDay": null,
               "exemptSalaryWeekly": 1237.50, "exemptSalaryNote": "rest of state, executive/administrative, 2026",
               "note": "", "source": {...}},
  "sickLeave": {"mandatory": true, "accrual": "1 hour for every 30 hours worked", "accrualPerHours": 30,
                "capHours": 56, "capNote": "100+ employees: 56 h; 5-99: 40 h paid; 0-4: 40 h (paid if net income > $1M)",
                "employerThreshold": "all employers", "effective": "2020-09-30", "note": "", "source": {...}},
  "familyLeave": {"paidProgram": true, "name": "New York Paid Family Leave", "benefitsStart": "2018-01-01",
                  "maxWeeks": 12, "replacement": "67% of average weekly wage up to 67% of the state average weekly wage",
                  "maxWeeklyBenefit2026": 1228.53, "medicalLeave": "separate disability benefits (DBL), 26 weeks",
                  "stateUnpaidLaw": null, "source": {...}},
  "finalPay": {"fired": "by the next regular payday", "firedDays": null, "quit": "by the next regular payday", "quitNotice": null,
               "ptoPayout": "policy", "ptoNote": "paid out unless a written policy says otherwise", "source": {...}, "ptoSource": {...}},
  "breaks": {"meal": "30 minutes for shifts over 6 hours spanning 11am-2pm", "mealMinutes": 30, "mealAfterHours": 6,
             "rest": null, "restMinutes": null, "restPerHours": null, "minorsOnly": null, "source": {...}},
  "rightToWork": false, "rightToWorkSource": null,
  "atWill": "at-will" ,
  "notes": [ {"text": "one rare, state-specific fact worth a sentence (e.g. a 2026 change, an unusual rule)", "source": {...}} ],
  "uncertain": []
}
```

Field rules:
- `rates2026`: EVERY general rate in force at any point in calendar 2026 (Jan 1, Jul 1, Sep 30 changes, regional rates, small-employer rates as separate rows with `area`). `headline` = the general rate in force TODAY (2026-10-11) for most workers, `headlineArea` its area label. If state has no law or a rate below $7.25, `federalApplies: true`, headline = 7.25 and say so in `smallEmployer`/`other`.
- `rates2027`: only if officially enacted/announced on an official page you read; else `[]`.
- `tipped.cashWage`: minimum cash wage for tipped employees in 2026 (today's value); `tipCreditAllowed: false` where tipped workers get the full minimum (CA, WA, OR, NV, MN, MT, AK...).
- `localMinWages`: major cities/counties with their own 2026 minimum wage (official city/county page). Only for your states. Up to ~12 for big states.
- `overtime.weeklyHours`: 40 if the state has its own weekly overtime rule (or adopts FLSA by statute); null if no state overtime law (FLSA only). `dailyHours`: daily overtime threshold if any (CA 8, AK 8, NV 8 conditional, CO 12). `exemptSalaryWeekly`: state salary minimum for white-collar exemption in 2026 when higher than federal $684/week, else null.
- `sickLeave`: mandatory statewide paid sick leave for private employers (note 2025-2026 changes: e.g. Missouri repeal, Nebraska, Alaska, Michigan ESTA). `capHours` = usual annual accrual/usage cap for a mid-size employer, explained in `capNote`.
- `familyLeave`: state PAID family & medical leave insurance program (CA, NJ, RI, NY, WA, DC, MA, CT, OR, CO, MD, DE, MN, ME, VT/NH voluntary...): benefitsStart (when benefits are/were first payable), maxWeeks, replacement formula, 2026 max weekly benefit if published. `stateUnpaidLaw` = a state job-protected leave law broader than FMLA (e.g. CFRA), else null.
- `finalPay`: deadline for final wages when fired and when quitting (with/without notice). `firedDays` = number of calendar days if the law gives a fixed count (0 = immediately), else null. `ptoPayout`: "required" (accrued vacation must be paid at separation), "policy" (follows employer policy/contract), "no-law".
- `breaks`: rules for ADULT employees; `minorsOnly` text if only minors get breaks. Null fields if none.
- `rightToWork`: true if the state has a right-to-work law in force on 2026-10-11 (Michigan repealed in 2024). Source = state statute/constitution page.
- `atWill`: "at-will" for all except Montana (Wrongful Discharge from Employment Act) — write the specific text for Montana.
- `notes`: 1-4 genuinely state-specific facts (2026 changes, unusual rules), sourced.

Quality bar: a wrong number on this site misleads a worker. Prefer the most recent official page; when two official pages disagree, take the newer and note it in `uncertain`. Keep quotes short (under 200 chars). Validate your JSON with `python3 -m json.tool <file>`.

At the end, reply with: list of files written, and for each state the `uncertain` items (or "none").


## Pace
Write each state file as soon as it is done. Spend at most ~12 tool calls per state. No browser automation (Chrome) at all.
