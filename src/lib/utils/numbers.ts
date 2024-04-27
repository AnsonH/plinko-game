/**
 * Calculate the probabilities of a ball falling into each bin (from left to right).
 *
 * It follows a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution),
 * where the probability of a ball falling into `k`th bin after `n` rows is:
 *
 * ```text
 * Pr(k; n, p) = C(n, k) * p^k * (1 - p)^(n - k)
 * ```
 *
 * , where `C(n, k) = n! / (k! * (n - k)!)` and `p = 0.5`.
 */
export function computeBinProbabilities(rowCount: number): number[] {
  const p = 0.5; // probability of success on a single trial
  const probabilities = [];

  for (let k = 0; k <= rowCount; k++) {
    const binomialCoefficient = factorial(rowCount) / (factorial(k) * factorial(rowCount - k));
    const probability = binomialCoefficient * Math.pow(p, k) * Math.pow(1 - p, rowCount - k);
    probabilities.push(probability);
  }

  return probabilities;
}

/**
 * Counts how many times each value occurs in the given array.
 */
export function countValueOccurrences<T extends string | number>(values: T[]): Record<T, number> {
  const result = {} as Record<T, number>;
  for (const value of values) {
    result[value] = (result[value] || 0) + 1;
  }
  return result;
}

export function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
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
