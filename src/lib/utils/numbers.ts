/**
 * Counts how many times each value occurs in the given array.
 */
export function countValueOccurrences(values: number[]): Map<number, number> {
  const valueCounts = new Map<number, number>();
  for (const value of values) {
    valueCounts.set(value, (valueCounts.get(value) ?? 0) + 1);
  }
  return valueCounts;
}

/**
 * Gets a random number in the range of `[min, max]`.
 */
export function getRandomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Returns all integers between `min` and `max` (inclusive).
 */
export function getIntegersBetween(min: number, max: number): number[] {
  return Array.from({ length: max - min + 1 }, (_, idx) => min + idx);
}
