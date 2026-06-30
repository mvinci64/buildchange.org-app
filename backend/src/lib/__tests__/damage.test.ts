import { toDamageGroup } from '../damage';

describe('toDamageGroup (backend)', () => {
  it.each([
    [0.1, 1],
    [0.25, 1],
    [0.26, 2],
    [0.5, 2],
    [0.51, 3],
    [0.75, 3],
    [0.76, 4],
    [0.99, 4],
  ])('pct %f -> group %i', (pct, group) => {
    expect(toDamageGroup(pct)).toBe(group);
  });
});
