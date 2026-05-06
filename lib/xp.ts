export function calcLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function xpToNextLevel(xp: number): number {
  return 100 - (xp % 100);
}

export function xpProgressPct(xp: number): number {
  return xp % 100;
}

const LEVEL_TITLES: [number, string][] = [
  [20, 'Master'],
  [10, 'Advanced'],
  [5, 'Intermediate'],
  [1, 'Beginner'],
];

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES.find(([min]) => level >= min)?.[1] ?? 'Beginner';
}
