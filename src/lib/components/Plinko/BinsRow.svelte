<script lang="ts">
  import { binPayouts } from '$lib/constants/game';
  import { plinkoEngine, riskLevel, rowCount } from '$lib/stores/game';
</script>

<div class="flex h-7 w-full justify-center">
  <div class="flex gap-[1%]" style:width={`${($plinkoEngine?.binsWidthPercentage ?? 0) * 100}%`}>
    {#each binPayouts[$rowCount][$riskLevel] as payout}
      <div
        class="flex flex-1 items-center justify-center rounded-md bg-amber-400 text-xs font-bold text-gray-950"
      >
        {payout}×
      </div>
    {/each}
  </div>
</div>
