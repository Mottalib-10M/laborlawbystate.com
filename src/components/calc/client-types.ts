/** Compact state data shipped to the calculators (built server side by src/lib/client-data.ts). */
import type { OtRule } from '../../lib/engine/overtime';
export interface ClientArea { label: string; rate: number; local: boolean }
export interface ClientState {
  slug: string; name: string; abbr: string;
  mw: number; stateMw: number; federal: boolean; areas: ClientArea[]; r2027: number | null; r2027From: string | null; jan: number;
  tipped: number | null; tipCredit: boolean;
  ot: OtRule; otDailyBelow: number | null; exempt: number | null;
  sick: { mandatory: boolean; perHours: number | null; cap: number | null; accrual: string | null };
  pfl: { name: string; weeks: number | null; maxWeekly: number | null } | null;
  final: { fired: string; firedDays: number | null; quit: string; quitNotice: string | null; pto: string };
  breaks: { meal: string | null; mealMinutes: number | null; mealAfterHours: number | null; rest: string | null; restMinutes: number | null; restPerHours: number | null; minorsOnly: string | null };
  agency: { name: string; url: string };
}
