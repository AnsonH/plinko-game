/**
 * Gets a random number in the range of `[min, max]`.
 */
export function getRandomBetween(min: number, max: number): number {
	return min + Math.random() * (max - min);
}
