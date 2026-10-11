# Écrire ou étoffer une page du « State Labor Law Guide »

Notice pour les agents qui écrivent une page. À lire en entier avant d'écrire, avec
`~/Documents/GitHub/RECETTE-SITE.md` (§0, §6, §6.5, §7, §9, §9.3, §11, §17.4, §21, §26).

Le site : le droit du travail des 50 États américains et du District of Columbia en 2026, pour un **salarié du
privé** : salaire minimum (taux en vigueur, hausses datées du 1er janvier, du 1er juillet, du 30 septembre en
Floride, taux 2027 annoncés, salaires municipaux, salaire des pourboires), heures supplémentaires (seuils
quotidiens et hebdomadaires, test de salaire des cadres exemptés), FMLA, congé maladie payé, congé familial payé,
dernier salaire et paiement des congés, pauses, right-to-work, at-will. **Anglais américain seul**, sous `/en/`.
Dollars, `$` devant, virgule des milliers. Éditeur : la société **Radif Partners** (jamais un nom de personne,
jamais de photo, ni INSEAD, ni Mines, ni LinkedIn). Aucun lien vers un autre site du portefeuille
(`_trame/domaines-ovh.txt`). Information générale, **jamais de conseil juridique individuel** (« the state labor
agency decides a wage claim », « an employment lawyer can look at your facts »).

**Ne pas chevaucher le site voisin des heures de travail** (calculateurs de time card, timesheet, salaire horaire ↔
annuel) : ici, la règle de droit par État ; pour les heures sup, la règle (seuils, exemptions), pas la feuille de temps.

## Les fichiers d'une page

| Page | Fichier de prose | Route |
|---|---|---|
| Page sujet (pilier avec calculateur, guide avec mini-simulateur) | `src/content/pages/<id>.ts` (`definePage`) | `/en/<slug>/` |
| Page d'État | `src/content/states/<slug>.ts` (`defineStatePage`) | `/en/states/<slug>/` |
| Faits de l'État (données sourcées) | `research/states/<slug>.json` → `python3 scripts/sync-states.py` → `src/data/states/<slug>.json` | — |

Le **plan** (id, slug, groupe, type, requête visée) est dans `src/lib/planned.ts` : une page doit y figurer avec
exactement le même `id`, `slug`, `group` et `kind` (le test le vérifie). Les pages d'État ont l'id `state:<slug>`.
**Modèles à lire avant d'écrire** (structure seulement, jamais les phrases) :

- pilier avec calculateur : `src/content/pages/fmla.ts` ;
- page d'État : `src/content/states/new-york.ts`.

### Champs d'une page sujet (`definePage`)

| Champ | Règle |
|---|---|
| `id`, `group`, `kind`, `slug` | = `src/lib/planned.ts`. `id` = nom du fichier. |
| `order` | place dans le menu du groupe (10, 20, 30…). |
| `nav`, `card` | libellé de menu ; une phrase pour les cartes « Read next » et l'index de l'accueil. |
| `title` | **50 à 60 caractères**, contient 2026, **terme-clé en tête** (« FMLA 2026: … », « Overtime Laws by State 2026: … »). Jamais en tête : un mot d'outil (Calculator), une question (How, What, Is…), le pays (US, USA, American). Pas de tiret cadratin, pas d'espace avant `:`. Unique. Pour « how many hours is full time » : « Full-Time Hours 2026: … ». |
| `description` | **150 à 160 caractères**, contient 2026 et un chiffre **calculé** depuis les données. Unique. |
| `h1` | sans année de préférence. |
| `intro` | une phrase. |
| `resume` | **UN** paragraphe de **120 mots ou plus** (viser 130 à 180) : la réponse directe à la requête, chiffres compris. Pour un pilier il est affiché replié : la première phrase porte le message. |
| `tool` / `toolProps` | piliers : `minwage`, `overtime`, `fmla`, `finalpay` (ou `rights`). `toolProps: { state }`. |
| `mini` / `miniArg` | guides : un mini-simulateur de `src/lib/minis/<kind>.ts`. Les minis d'État reçoivent `stateArg('Texas')`, `pflArg()`, `cityArg()` de `src/lib/mini-args.ts`. |
| `faqs` | piliers 6 à 8, guides 4 à 8. **Vraies questions telles qu'on les tape**, réponses de **45 à 85 mots** (le test compte 42 à 88), avec le chiffre, la condition et la source. **Une question n'existe qu'une fois sur tout le site** (accueil compris). |
| `body(h)` | HTML. Piliers : **450 mots ou plus** hors tableaux (viser 600 à 900). Guides : **950 mots ou plus** hors tableaux (`check-seo` exige 1 200 mots sur la page entière, réponse et FAQ comprises ; viser 1 000 à 1 300 dans le corps). Trois à six `<h2>` propres à la page. Un second mini dans le corps est bienvenu (`${h.mini('kind', arg)}`). |
| `related` | 3 à 6 ids existants ou planifiés (pages, `state:<slug>`, `states`, `method`). |
| `sources` | clés de `src/data/params-2026.json > sources` (piliers 3 ou plus, autres 2 ou plus). |
| `extraSources` | `[{ name, url }]` pour une page officielle d'État citée dans le texte. |

### Champs d'une page d'État (`defineStatePage`)

| Champ | Règle |
|---|---|
| `slug` | = nom du fichier. |
| `title` | 50 à 60 caractères, **commence par le nom de l'État**, puis le terme-clé, 2026 inclus : « Texas Labor Laws 2026: $7.25 Minimum Wage and No State OT », « Ohio Minimum Wage 2026: $11.00, Overtime, Leave, Final Pay »… Varier d'un État à l'autre (ne pas recopier le gabarit de New York). |
| `description` | 150 à 160 caractères, avec 2026 et au moins un chiffre calculé. |
| `intro` | une phrase propre à l'État. |
| `resume` | **UN** paragraphe de **120 mots ou plus** : la réponse pour cet État, chiffres calculés avec le kit. Première phrase = le message. |
| `body(h)` | **380 mots ou plus** hors tableaux (viser 450 à 650), écrits pour cet État seulement. **Ouvrir sur ce que l'État a de plus rare** (un taux régional, une hausse au 1er juillet, une abrogation, une loi qui vient d'entrer en vigueur, l'absence de toute loi, un salaire municipal, Montana et la bonne cause…). Trois à cinq `<h2>`. Au moins un mini (`${h.mini('stateCompare', stateArg())}` ou mieux un mini lié au point rare : `sickAccrual`, `shiftBreaks`, `tipTopUp`, `raiseTimeline`, `ptoPayout`, `cityCompare`, `pflState`, `exemptCheck`…) avec l'État présélectionné (`stateArg('Ohio')`). |
| `faqs` | 3 à 5 vraies questions **contenant le nom de l'État** (ou son abréviation), réponses 45 à 85 mots. |
| `related` | 3 à 6 ids : États voisins, pages sujets. |

Le composant de page affiche **seul**, depuis les données : les six chiffres clés, le calculateur verrouillé sur
l'État, puis après la prose le tableau des taux 2026, les salaires municipaux, et un paragraphe par règle (heures
sup, congés, dernier salaire, pauses, right-to-work, notes), chacun avec sa source. **La prose ne recopie pas ces
blocs** : elle explique ce qui est singulier, avec un exemple chiffré calculé.

## La règle des chiffres (non négociable, RECETTE §17.4 point 7)

Aucun taux, seuil, montant ou date qui existe dans les données n'est tapé en dur : il se lit ou se calcule avec
le kit (`src/lib/kit.ts`, aussi passé au corps sous `h.`).

```ts
import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mwOn, mw2027, mwJan, otCalc, sickYear, rate$, usd, usdx, day, F, FM } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';
const S = sd('ohio');
title: `Ohio Minimum Wage 2026: ${rate$(mwNow('ohio'))}, Overtime, Leave, Final Pay`
```

Une **hypothèse d'exemple** (« a cook earning $18 an hour », « 45 hours a week ») peut s'écrire en clair. Un
chiffre **absent des données ne s'écrit pas**, sauf s'il vient d'une page officielle que vous lisez vous-même
(curl/WebFetch d'un site .gov ou du code de l'État) : ajoutez-la alors en `extraSources` (pages sujets) ou citez-la
avec `h.ext(url, texte)`, et signalez-le dans votre compte rendu. Un nombre de loi qui n'est pas un paramètre (« 30
minutes », « every 4 hours ») peut s'écrire s'il figure dans le texte du fichier d'État.

### Le kit (extraits, voir `src/lib/kit.ts`)

- Données : `sd(slug)` → l'objet du fichier d'État (`minWage`, `localMinWages`, `overtime`, `sickLeave`, `familyLeave`, `finalPay`, `breaks`, `rightToWork`, `atWill`, `notes`, `uncertain`, `agency`). `STATES` = les États chargés.
- Salaire minimum : `mwNow(slug)` (en vigueur à la date de contrôle, jamais sous le fédéral), `mwState(slug)`, `mwOn(slug, date, area?)`, `mw2026(slug)` (lignes datées), `mwMidYear(slug)`, `mwJan(slug)`, `mw2027(slug)` (`{from, rate, area}` ou null), `mwRaise(slug)`, `fullTimeAt(rate, hours)` → `{weekly, monthly, annual}`, `tippedCash(slug)`, `locals(slug)`, `atFederal()`, `highest(n)`.
- Heures sup : `otRule(slug, rate?)`, `otCalc(slug, rate, hoursPerDay, daysPerWeek)` → `{regularHours, otHours, doubleHours, regularPay, otPay, doublePay, total, basis}`, `exemptLevel(slug)`, `exemptTest(slug, weekly)`.
- Congés, heures : `fmlaCheck({...})`, `hoursCheck(h)`, `sickYear(slug, hoursPerWeek)` → `{accrued, capped}`, `pflStates()`, `sickStates()`, `breakShift(slug, h)`, `finalPayDate(slug, isoDate)`, `rtwStates()`, `garnish(weekly)`, `sev(weekly, years, weeksPerYear)`.
- Fédéral : `F` (= `P.federal` : `minWage`, `tippedCash`, `tipCredit`, `youthWage`, `otMultiplier`, `otWeeklyHours`, `exemptWeekly`, `hceAnnual`, `computerHourly`, `garnish*`, `warn*`), `FM` (= `P.fmla`), `ACA` (= `P.aca`), `TODAY` (date de contrôle).
- Formats : `rate$(16.9)` → « $16.90 » (taux horaire officiel, avec cents), `usd(n)` (sans cents), `usdx(n)` (cents seulement si le chiffre officiel en a), `pct`, `num`, `day(iso)` → « October 1, 2026 », `listOf([...])`, `names(states)`.
- Dans `body(h)` en plus : `h.a(id, texte)` (lien interne ; id inconnu = test en échec), `h.table(entêtes, lignes, légende, alignements)`, `h.src(clé, texte?)`, `h.ext(url, texte)`, `h.box(titre, html)`, `h.mini(kind, arg)`.

## Ton et langue

- **Anglais américain** ; termes exacts : « minimum wage », « tipped minimum wage / cash wage », « tip credit », « time and a half », « non-exempt », « salary basis test », « paid sick leave », « paid family and medical leave », « final paycheck », « meal period », « rest break », « at-will », « right-to-work », le nom local du programme (Paid Family Leave, FAMLI, PFML, CT Paid Leave…) et de l'agence (Department of Labor and Industry…).
- Voix humaine, phrases de longueur variable, **le chiffre d'abord**. Interdits (le test les refuse) : tiret cadratin « — », « it's important to note », « dive into », « delve », « whether you're… », « navigate the », « Moreover », « Additionally », « Furthermore », « in today's world », « crucial », « landscape », « seamless », « robust », « empower ». Pas de triplets en série, pas de conclusion qui résume, pas d'émoji.
- **Local réel** : agences, programmes, villes, comtés et lois de l'État tels qu'ils figurent dans `sd(slug)` (si un champ est vide ou `uncertain`, ne pas l'inventer : le dire, ou se taire).
- **Vérité** : jamais de chiffre ou de règle non sourcés. Une règle annoncée mais pas encore en vigueur s'écrit avec sa date d'effet. Pas d'avis juridique individuel.
- **Unicité** (§6) : `check-unique` compare toutes les pages, chiffres neutralisés, seuil 30 %, fenêtre des 12 000 premiers caractères. Écrire ce qui n'appartient qu'à la page, avec **un vocabulaire propre** ; aucune tournure reprise d'une autre page ni d'un autre site du portefeuille (`check-portefeuille`). Pour les États : ouvrir sur la donnée la plus rare, varier l'ordre et les titres des sections et les questions d'un État à l'autre ; ne pas reprendre les intertitres de New York.

## Contrôles (à lancer avant de rendre la main)

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/us-labor-law
python3 scripts/sync-states.py
ALLOW_PLANNED=1 PAGE_FILES=fmla,state:ohio npx vitest run tests/pages.test.ts   # vos pages
```

Puis l'orchestrateur : `npm run build`, `check-unique`, `check-seo`, `check-trame`, `check-portefeuille`, `check-regles`…

## Données et mise à jour annuelle

- `research/BRIEF-STATE-RESEARCH.md` : le cahier des charges du relevé par État (sources admises, forme du JSON).
- `research/states/<slug>.json` : le relevé, chaque valeur avec `source.url`, `quote` et `accessed`. Corrections relues : `research/overrides/<slug>.json` (fusionné par `sync-states.py`, avec `_why`).
- `src/data/params-2026.json` : paramètres fédéraux (DOL, eCFR, IRS), chacun avec sa source.
- Rythme : 1er janvier et 1er juillet (salaires minimums), 30 septembre (Floride), annonces d'automne des taux indexés
  (Washington, Arizona, Colorado, Californie, New Jersey, Maine, Minnesota, Michigan…), 1er janvier pour les plafonds
  des congés familiaux payés.

## Ce qu'on ne fait pas

- Ne pas toucher au cœur (`src/lib/*.ts` hors `src/lib/minis/`, `src/components`, `src/data`, `scripts`) sans le dire au compte rendu.
- Ne pas toucher à `_trame`, à la RECETTE, ni à un autre site. Pas de dépôt GitHub, pas de push, pas de DNS, pas de Chrome.

## Limites connues (2026-10-11)

- **`check-sources.mjs`** lit aussi `research/` (≈ 410 URL). Une quarantaine de sites d'État répondent 403 aux
  robots (Rhode Island, Tennessee, Nouveau-Mexique, Colorado, Missouri, Texas, legislatures de NY et NC…) et une
  dizaine coupent la connexion (Nebraska, codes.ohio.gov, oscn.net) : les agents les ont lus par WebFetch, par
  copie de l'Internet Archive ou par proxy texte, ce qui est noté dans `uncertain` du fichier d'État. Revérifier
  à la main avant de conclure qu'un lien est mort.
- **Right-to-work non confirmé** : `rightToWork: null` dans le relevé devient `rightToWorkUnknown: true` ; la page
  et les minis n'affirment rien (Arkansas, Wisconsin au 2026-10-11).
- **Délais en jours ouvrés** : une règle de dernier salaire dont le texte dit « business day » ou « working day »
  est comptée en jours ouvrés (`countsBusinessDays`), jours fériés non modélisés.
- **Seuils hebdomadaires d'État au-dessus de 40 h** (Minnesota 48, Kansas 46) : affichés comme règle fédérale de
  40 h, le seuil d'État ne vaut que pour les emplois hors FLSA.
- **Minis entre deux paragraphes** : `check-layout` signale un « trou » ; toujours placer un mini juste avant un `<h2>`.
