import { describe, expect, it } from 'vitest';
import { interpolateRgbColors } from '../colors';

describe('interpolateRgbColors', () => {
  it('interpolates between two RGB colors', () => {
    // 2 colors
    expect(interpolateRgbColors({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, 2)).toEqual([
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
    ]);

    // 5 colors
    const from = { r: 0, g: 100, b: 0 };
    const to = { r: 80, g: 0, b: 255 };
    expect(interpolateRgbColors(from, to, 5)).toEqual([
      { r: 0, g: 100, b: 0 },
      { r: 20, g: 75, b: 64 },
      { r: 40, g: 50, b: 128 },
      { r: 60, g: 25, b: 191 },
      { r: 80, g: 0, b: 255 },
    ]);
  });
});
