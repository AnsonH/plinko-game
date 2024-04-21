import { describe, expect, it, vi } from 'vitest';
import { countValueOccurrences, getIntegersBetween, getRandomBetween } from '../numbers';

describe('countValueOccurrences', () => {
  it('returns a map of how many times each value occurs', () => {
    expect(countValueOccurrences([0, 1, 0, 4, 2, 1])).toEqual(
      new Map([
        [0, 2],
        [1, 2],
        [2, 1],
        [4, 1],
      ]),
    );
    expect(countValueOccurrences([])).toEqual(new Map());
  });
});

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
