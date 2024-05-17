<script lang="ts">
  import { binColorsByRowCount } from '$lib/constants/game';
  import { winRecords } from '$lib/stores/game';

  /**
   * Number of last wins to display.
   */
  export let winCount = 4;

  $: lastWins = $winRecords.slice(-winCount).toReversed();
</script>

<!-- Clamps in mobile:
      - Width: From 1.5rem at 340px viewport width to 2rem at 620px viewport width
      - Font size: From 8px at 340px viewport width to 10px at 620px viewport width
 -->
<div
  class="flex w-[clamp(1.5rem,0.893rem+2.857vw,2rem)] flex-col overflow-hidden rounded-sm text-[clamp(8px,5.568px+0.714vw,10px)] md:rounded-md lg:w-12 lg:text-sm"
  style:aspect-ratio={`1 / ${winCount}`}
>
  {#each lastWins as { binIndex, rowCount, payout: { multiplier } }}
    <div
      class="flex aspect-square items-center justify-center font-bold text-gray-950"
      style:background-color={binColorsByRowCount[rowCount].background[binIndex]}
    >
      {multiplier}{multiplier < 100 ? '×' : ''}
    </div>
  {/each}
</div>
