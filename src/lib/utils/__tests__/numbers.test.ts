import { describe, expect, it, vi } from 'vitest';
import {
  computeBinProbabilities,
  convertScale,
  countValueOccurrences,
  dotProduct,
  factorial,
  formatCurrency,
  getRandomBetween,
} from '../numbers';

describe('computeBinProbabilities', () => {
  it('calculates the probabilities of each bin with the given number of rows', () => {
    expect(computeBinProbabilities(8)).toEqual([
      0.00390625, 0.03125, 0.109375, 0.21875, 0.2734375, 0.21875, 0.109375, 0.03125, 0.00390625,
    ]);
    expect(computeBinProbabilities(9)).toEqual([
      0.001953125, 0.017578125, 0.0703125, 0.1640625, 0.24609375, 0.24609375, 0.1640625, 0.0703125,
      0.017578125, 0.001953125,
    ]);
  });
});

describe('countValueOccurrences', () => {
  it('returns a map of how many times each value occurs', () => {
    expect(countValueOccurrences(['a', 'aa', 'a', 'b', 'c'])).toEqual({
      a: 2,
      aa: 1,
      b: 1,
      c: 1,
    });
    expect(countValueOccurrences([0, 1, 0, 4, 2, 1])).toEqual({
      0: 2,
      1: 2,
      2: 1,
      4: 1,
    });
    expect(countValueOccurrences([])).toEqual({});
  });
});

describe('dotProduct', () => {
  it('computes the dot product of two 1D vectors', () => {
    expect(dotProduct([1, 2, 3], [4, 5, 6])).toBe(32);
    expect(dotProduct([-1, 4, 2, 1], [1, -2, 3, 2])).toBe(-1);
    expect(dotProduct([], [])).toBe(0);
  });
});

describe('factorial', () => {
  it('returns the factorial of a number', () => {
    const inputs = [0, 1, 2, 3, 4, 5];
    const expectedOutputs = [1, 1, 2, 6, 24, 120];
    expect(inputs.map(factorial)).toEqual(expectedOutputs);
  });
});

describe('formatCurrency', () => {
  it('formats a number as currency', () => {
    const testCases: [number, string][] = [
      [10, '$10.00'],
      [123456.789, '$123,456.79'],
      [0, '$0.00'],
      [-1234.567, '-$1,234.57'],
    ];

    testCases.forEach(([input, expectedOutput]) => {
      expect(formatCurrency(input)).toBe(expectedOutput);
    });
  });
});

describe('getRandomBetween', () => {
  it('returns a number between the given range', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.25);
    expect(getRandomBetween(100, 200)).toBe(125);
  });
});

describe('convertScale', () => {
  it('converts a value from one scale to another', () => {
    expect(convertScale(0.5, [0, 1], [0, 100])).toBe(50);
    expect(convertScale(0.75, [0, 1], [100, 200])).toBe(175);
    expect(convertScale(150, [100, 200], [0, 1])).toBe(0.5);
  });
});
