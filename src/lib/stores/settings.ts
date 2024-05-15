import { writable } from 'svelte/store';

// Good to have: Set default value based on `prefers-reduced-motion`
export const isAnimationOn = writable<boolean>(true);
