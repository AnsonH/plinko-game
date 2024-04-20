import { describe, expect, it, vi } from 'vitest';
import { getRandomBetween } from '../numbers';

describe('getRandomBetween', () => {
	it('returns a number between the given range', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0.25);
		expect(getRandomBetween(100, 200)).toBe(125);
	});
});
