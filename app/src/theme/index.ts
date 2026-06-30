export const colors = {
  primary: '#0B5FFF',
  onPrimary: '#FFFFFF',
  background: '#FFFFFF',
  text: '#11181C',
  textMuted: '#5B6770',
  border: '#E3E8EE',
  muted: '#AEB7BF',
  // damage severity ramp (green -> red)
  damage1: '#2E7D32', // low
  damage2: '#F9A825', // moderate
  damage3: '#EF6C00', // severe
  damage4: '#C62828', // critical
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const typography = {
  h2: { fontSize: 22, fontWeight: '700' as const, color: colors.text },
  h3: { fontSize: 17, fontWeight: '600' as const, color: colors.text },
  button: { fontSize: 16, fontWeight: '600' as const },
};

/** Map a damage group (1-4) to its ramp color. */
export function damageColor(group: number): string {
  switch (group) {
    case 4:
      return colors.damage4;
    case 3:
      return colors.damage3;
    case 2:
      return colors.damage2;
    default:
      return colors.damage1;
  }
}
