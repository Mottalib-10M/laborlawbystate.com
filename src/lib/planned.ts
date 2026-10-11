/**
 * Every page id of the plan (CONTRIBUTING-PAGES.md), with the measured query it answers
 * (reports/volumes-2026-10-10b/topic-us-labor-law.txt). Used by the page test; with ALLOW_PLANNED=1 a page may
 * link to a page another writer is still preparing. The final run is made without it.
 */
import { STATE_LIST } from '../data/states';
export type Kind = 'pillar' | 'guide';
export const PLANNED_PAGES: Array<{ id: string; group: string; kind: Kind; slug: string; query: string }> = [
  { id: 'minimum-wage-by-state', group: 'wage', kind: 'pillar', slug: 'minimum-wage-by-state', query: 'minimum wage by state (10k-100k), minimum wage 2026' },
  { id: 'minimum-wage-increases', group: 'wage', kind: 'guide', slug: 'minimum-wage-increases', query: 'minimum wage increase 2026 (1k-10k), minimum wage 2026' },
  { id: 'tipped-minimum-wage', group: 'wage', kind: 'guide', slug: 'tipped-minimum-wage-by-state', query: 'tipped minimum wage by state' },
  { id: 'city-minimum-wage', group: 'wage', kind: 'guide', slug: 'city-minimum-wage', query: 'minimum wage by city, local minimum wage' },
  { id: 'overtime-laws-by-state', group: 'overtime', kind: 'pillar', slug: 'overtime-laws-by-state', query: 'overtime laws by state, overtime calculator (rule, not time card)' },
  { id: 'time-and-a-half', group: 'overtime', kind: 'guide', slug: 'time-and-a-half', query: 'how much is time and a half (1k-10k)' },
  { id: 'exempt-vs-non-exempt', group: 'overtime', kind: 'guide', slug: 'exempt-vs-non-exempt', query: 'exempt vs non exempt (10k-100k)' },
  { id: 'salary-exempt-threshold', group: 'overtime', kind: 'guide', slug: 'salary-threshold-for-exempt-employees', query: 'salary exempt threshold 2026' },
  { id: 'fmla', group: 'leave', kind: 'pillar', slug: 'fmla', query: 'fmla (100k-1M)' },
  { id: 'fmla-eligibility', group: 'leave', kind: 'guide', slug: 'fmla-eligibility', query: 'fmla eligibility (1k-10k)' },
  { id: 'paid-family-leave-by-state', group: 'leave', kind: 'guide', slug: 'paid-family-leave-by-state', query: 'paid family leave by state' },
  { id: 'paid-sick-leave-by-state', group: 'leave', kind: 'guide', slug: 'paid-sick-leave-by-state', query: 'paid sick leave (1k-10k), sick leave laws by state' },
  { id: 'pto-payout-laws', group: 'leave', kind: 'guide', slug: 'pto-payout-laws-by-state', query: 'pto payout laws by state, is pto paid out when you quit' },
  { id: 'full-time-hours', group: 'hours', kind: 'guide', slug: 'how-many-hours-is-full-time', query: 'how many hours is full time (10k-100k)' },
  { id: 'part-time-hours', group: 'hours', kind: 'guide', slug: 'how-many-hours-is-part-time', query: 'how many hours is part time (10k-100k)' },
  { id: 'break-laws-by-state', group: 'hours', kind: 'guide', slug: 'break-laws-by-state', query: 'lunch break laws (1k-10k), break laws by state' },
  { id: 'final-paycheck-laws', group: 'job', kind: 'pillar', slug: 'final-paycheck-laws-by-state', query: 'final paycheck laws by state, final paycheck' },
  { id: 'at-will-employment', group: 'job', kind: 'guide', slug: 'at-will-employment', query: 'at will employment (10k-100k)' },
  { id: 'right-to-work-states', group: 'job', kind: 'guide', slug: 'right-to-work-states', query: 'right to work states (10k-100k)' },
  { id: 'severance-pay', group: 'job', kind: 'guide', slug: 'severance-pay', query: 'severance pay calculator (1k-10k)' },
  { id: 'wage-garnishment-limits', group: 'job', kind: 'guide', slug: 'wage-garnishment-limits', query: 'wage garnishment laws by state' },
];
export const PLANNED_IDS = [...PLANNED_PAGES.map((p) => p.id), ...STATE_LIST.map((s) => `state:${s.slug}`), 'home', 'states', 'method', 'about'];
