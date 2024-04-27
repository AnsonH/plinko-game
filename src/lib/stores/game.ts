import PlinkoEngine from '$lib/components/Plinko/PlinkoEngine';
import { rowCountOptions } from '$lib/constants/plinko';
import { countValueOccurrences } from '$lib/utils/numbers';
import { derived, writable } from 'svelte/store';

type WinRecord = {
  /**
   * Zero-based index of which bin the ball fell into (leftmost bin is 0).
   */
  binIndex: number;
};

export const plinkoEngine = writable<PlinkoEngine | null>(null);

/**
 * Number of rows of pins.
 */
export const rowCount = writable(rowCountOptions[0]);

export const winRecords = writable<WinRecord[]>([]);

export const binProbabilities = derived<
  [typeof winRecords, typeof rowCount],
  { [binIndex: number]: number }
>([winRecords, rowCount], ([$winRecords, $rowCount]) => {
  const occurrences = countValueOccurrences($winRecords.map(({ binIndex }) => binIndex));
  const probabilities: Record<number, number> = {};
  for (let i = 0; i < $rowCount + 1; ++i) {
    probabilities[i] = occurrences[i] / $winRecords.length || 0;
  }
  return probabilities;
});
