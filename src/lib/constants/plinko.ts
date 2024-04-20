import { getIntegersBetween } from '$lib/utils/numbers';

/**
 * Range of row counts the game supports.
 */
export const rowCountOptions = getIntegersBetween(8, 16);
