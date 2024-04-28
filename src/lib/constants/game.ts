import { computeBinProbabilities } from '$lib/utils/numbers';

/**
 * Range of row counts the game supports.
 */
export const rowCountOptions = [8, 9, 10, 11, 12, 13, 14, 15, 16] as const;

/**
 * Number of rows of pins the game supports.
 */
export type RowCount = (typeof rowCountOptions)[number];

/**
 * For each row count, what's the probabilities of a ball falling into each bin.
 */
export const binProbabilitiesByRowCount: Record<RowCount, number[]> = rowCountOptions.reduce(
  (acc, rowCount) => {
    acc[rowCount] = computeBinProbabilities(rowCount);
    return acc;
  },
  {} as Record<RowCount, number[]>,
);
