type RgbColor = { r: number; g: number; b: number };

/**
 * Creates a gradient of RGB colors of length `length`.
 *
 * @param from The starting RGB color.
 * @param to The ending RGB color.
 * @param length Number of colors in the output array. Must be `>= 2` since the first
 * and last color are `from` and `to`.
 */
export function interpolateRgbColors(from: RgbColor, to: RgbColor, length: number): RgbColor[] {
  return Array.from({ length }, (_, i) => ({
    r: Math.round(from.r + ((to.r - from.r) / (length - 1)) * i),
    g: Math.round(from.g + ((to.g - from.g) / (length - 1)) * i),
    b: Math.round(from.b + ((to.b - from.b) / (length - 1)) * i),
  }));
}
