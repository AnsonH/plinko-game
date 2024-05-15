import { writable } from 'svelte/store';

export const isLiveStatsOpen = writable<boolean>(false);
