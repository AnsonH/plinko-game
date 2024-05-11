import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { convertScale } from './numbers';

type FlyAndScaleParams = {
  y?: number;
  start?: number;
  duration?: number;
};

const defaultFlyAndScaleParams = {
  y: -8,
  start: 0.9,
  duration: 200,
};

// Credits: https://github.com/huntabyte/bits-ui/blob/bits-ui%400.21.7/sites/docs/src/lib/utils/transitions.ts
export function flyAndScale(node: Element, params?: FlyAndScaleParams): TransitionConfig {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;
  const withDefaults = { ...defaultFlyAndScaleParams, ...params };

  const styleToString = (style: Record<string, number | string | undefined>): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return `${str}${key}:${style[key]};`;
    }, '');
  };

  return {
    duration: withDefaults.duration,
    delay: 0,
    css: (t) => {
      const y = convertScale(t, [0, 1], [withDefaults.y, 0]);
      const scale = convertScale(t, [0, 1], [withDefaults.start, 1]);

      return styleToString({
        transform: `${transform} translate3d(0, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
}
