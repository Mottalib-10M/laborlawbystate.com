/**
 * Menu groups. Every page file names its group; menus, footer and breadcrumbs read them.
 * State pages live apart, at /en/states/<state>/ (id "state:<slug>").
 */
export type Group = 'wage' | 'overtime' | 'leave' | 'hours' | 'job';
export interface GroupInfo { id: Group; label: string; short: string }
export const GROUPS: GroupInfo[] = [
  { id: 'wage', label: 'Minimum wage', short: 'Minimum wage' },
  { id: 'overtime', label: 'Overtime and exemptions', short: 'Overtime' },
  { id: 'leave', label: 'FMLA, sick and family leave', short: 'Leave' },
  { id: 'hours', label: 'Hours and breaks', short: 'Hours' },
  { id: 'job', label: 'Leaving a job', short: 'Leaving a job' },
];
export const groupInfo = (id: Group): GroupInfo => GROUPS.find((g) => g.id === id)!;
export const stateId = (slug: string) => `state:${slug}`;
