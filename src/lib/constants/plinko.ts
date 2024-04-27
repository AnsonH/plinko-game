import { computeBinProbabilities, getIntegersBetween } from '$lib/utils/numbers';

/**
 * Range of row counts the game supports.
 */
export const rowCountOptions = getIntegersBetween(8, 16);

/**
 * Key is the row count and value is the probabilities of a ball falling into each bin.
 */
export const binProbabilitiesByRowCount: Record<number, number[]> = rowCountOptions.reduce(
  (acc, rowCount) => {
    acc[rowCount] = computeBinProbabilities(rowCount);
    return acc;
  },
  {} as Record<number, number[]>,
);
