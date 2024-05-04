<script lang="ts">
  import { binPayouts } from '$lib/constants/game';
  import { plinkoEngine, riskLevel, rowCount } from '$lib/stores/game';
  import { interpolateRgbColors } from '$lib/utils/colors';

  $: binColors = getBinColors($rowCount);

  function getBinColors(rowCount: number): string[] {
    const binCount = rowCount + 1;
    const redToYellowLength = Math.ceil(binCount / 2);

    const RED = { r: 255, g: 0, b: 63 }; // rgb(255, 0, 63)
    const YELLOW = { r: 255, g: 192, b: 0 }; // rgb(255, 192, 0)

    const redToYellow = interpolateRgbColors(RED, YELLOW, redToYellowLength).map(
      ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`,
    );
    return [...redToYellow, ...redToYellow.reverse().slice(binCount % 2 === 0 ? 0 : 1)];
  }
</script>

<div class="flex h-7 w-full justify-center">
  <div class="flex gap-[1%]" style:width={`${($plinkoEngine?.binsWidthPercentage ?? 0) * 100}%`}>
    {#each binPayouts[$rowCount][$riskLevel] as payout, binIndex}
      <div
        class="flex flex-1 items-center justify-center rounded-md text-xs font-bold text-gray-950"
        style:background-color={binColors[binIndex]}
      >
        {payout}×
      </div>
    {/each}
  </div>
</div>
