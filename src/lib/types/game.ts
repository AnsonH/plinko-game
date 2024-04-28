export type { RowCount } from '$lib/constants/game';

export type WinRecord = {
  /**
   * Zero-based index of which bin the ball fell into (leftmost bin is 0).
   */
  binIndex: number;
};
