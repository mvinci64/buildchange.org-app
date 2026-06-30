/**
 * Map a 0–1 damage percentage to a 1–4 damage group.
 * Mirror of app src/utils/damage.ts. See DEVELOPER_BOOK.md §15.3.
 */
export function toDamageGroup(pct: number): 1 | 2 | 3 | 4 {
  if (pct > 0.75) return 4;
  if (pct > 0.5) return 3;
  if (pct > 0.25) return 2;
  return 1;
}

export const DAMAGE_GROUPS = [
  { value: 1, label: 'Group 1 — Low (<25%)' },
  { value: 2, label: 'Group 2 — Moderate (25–50%)' },
  { value: 3, label: 'Group 3 — Severe (50–75%)' },
  { value: 4, label: 'Group 4 — Critical (>75%)' },
];
