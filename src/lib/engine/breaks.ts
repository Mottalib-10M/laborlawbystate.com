/** Breaks owed for one shift under a state rule (adults): meal after N hours, paid rest per N hours. */
export interface BreakRule { mealMinutes: number | null; mealAfterHours: number | null; restMinutes: number | null; restPerHours: number | null }
export function breaksForShift(R: BreakRule, shiftHours: number) {
  const h = Math.max(0, shiftHours);
  const meals = R.mealMinutes && R.mealAfterHours != null ? (h > R.mealAfterHours ? 1 : 0) : 0;
  // Rest: one per full block of `restPerHours`, plus one for a remaining "major fraction" (more than half a block).
  let rests = 0;
  if (R.restMinutes && R.restPerHours) { const n = Math.floor(h / R.restPerHours); rests = n + (h - n * R.restPerHours > R.restPerHours / 2 ? 1 : 0); }
  return { meals, mealMinutes: meals * (R.mealMinutes ?? 0), rests: Math.max(0, rests), restMinutes: Math.max(0, rests) * (R.restMinutes ?? 0) };
}
