import { LOCAL_STORAGE_KEY } from '$lib/constants/game';
import { persisted } from 'svelte-persisted-store';

export const isAnimationOn = persisted<boolean>(LOCAL_STORAGE_KEY.SETTINGS.ANIMATION, true);
