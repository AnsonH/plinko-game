import { describe, expect, it, vi } from 'vitest';
import { getIntegersBetween, getRandomBetween } from '../numbers';

describe('getRandomBetween', () => {
  it('returns a number between the given range', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.25);
    expect(getRandomBetween(100, 200)).toBe(125);
  });
});

describe('getIntegersBetween', () => {
  it('returns a list of integers between the given range', () => {
    expect(getIntegersBetween(2, 6)).toEqual([2, 3, 4, 5, 6]);
    expect(getIntegersBetween(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    expect(getIntegersBetween(69, 69)).toEqual([69]);
  });
});
