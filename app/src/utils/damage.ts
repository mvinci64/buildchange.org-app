/**
 * Map a 0–1 damage percentage to a 1–4 damage group.
 * Mirror of backend lib/damage.ts. See DEVELOPER_BOOK.md §15.3.
 */
export function toDamageGroup(pct: number): 1 | 2 | 3 | 4 {
  if (pct > 0.75) return 4;
  if (pct > 0.5) return 3;
  if (pct > 0.25) return 2;
  return 1;
}
