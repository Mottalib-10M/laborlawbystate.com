/** Part-time schedule: the same federal thresholds, from the part-time side. */
import type { MiniSpec } from '../mini-types';
import { fullTimeSpec } from './fullTime';
export default (): MiniSpec => fullTimeSpec('What your part-time hours add up to', 24, 'Full-time hours', '/en/how-many-hours-is-full-time/');
