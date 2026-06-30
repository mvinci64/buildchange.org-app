export type DamageGroup = { value: number; label: string };

// Derived bands (see DEVELOPER_BOOK.md §15.3).
// Keep in sync with utils/damage.ts and backend lib/damage.ts.
export const DAMAGE_GROUPS: DamageGroup[] = [
  { value: 1, label: 'Group 1 — Low (<25%)' },
  { value: 2, label: 'Group 2 — Moderate (25–50%)' },
  { value: 3, label: 'Group 3 — Severe (50–75%)' },
  { value: 4, label: 'Group 4 — Critical (>75%)' },
];
