import PlinkoEngine from '$lib/components/Plinko/PlinkoEngine';
import { rowCountOptions } from '$lib/constants/plinko';
import { writable } from 'svelte/store';

export const plinkoEngine = writable<PlinkoEngine | null>(null);

/**
 * Number of rows of pins.
 */
export const rowCount = writable(rowCountOptions[0]);
