import { rowCountOptions } from '$lib/constants/plinko';
import { writable } from 'svelte/store';

export const rowCount = writable(rowCountOptions[0]);
