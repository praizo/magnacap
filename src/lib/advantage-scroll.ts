/** Keep a settled item stable through small movements around a scroll boundary. */
export function advantageStep(progress: number, current: number, count: number, force = false) {
  const position = Math.min(1, Math.max(0, progress)) * (count - 1);
  if (!force && Math.abs(position - current) < 0.58) return current;
  return Math.round(position);
}
