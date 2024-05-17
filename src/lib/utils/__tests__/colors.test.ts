import { describe, expect, it } from 'vitest';
import { getBinColors, interpolateRgbColors } from '../colors';

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

describe('getBinColors', () => {
  it('returns the bin colors by row count', () => {
    expect(getBinColors(8)).toEqual({
      background: [
        'rgb(255, 0, 63)',
        'rgb(255, 48, 47)',
        'rgb(255, 96, 32)',
        'rgb(255, 144, 16)',
        'rgb(255, 192, 0)',
        'rgb(255, 144, 16)',
        'rgb(255, 96, 32)',
        'rgb(255, 48, 47)',
        'rgb(255, 0, 63)',
      ],
      shadow: [
        'rgb(166, 0, 4)',
        'rgb(167, 30, 3)',
        'rgb(169, 61, 2)',
        'rgb(170, 91, 1)',
        'rgb(171, 121, 0)',
        'rgb(170, 91, 1)',
        'rgb(169, 61, 2)',
        'rgb(167, 30, 3)',
        'rgb(166, 0, 4)',
      ],
    });
  });
});
