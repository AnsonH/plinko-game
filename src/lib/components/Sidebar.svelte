<script lang="ts">
  import { rowCountOptions } from '$lib/constants/game';
  import { plinkoEngine, rowCount } from '$lib/stores/game';
</script>

<div class="flex min-w-[300px] flex-col gap-4 bg-gray-700 p-3">
  <div>
    <label for="rowCount" class="text-sm font-medium text-gray-300">Rows</label>
    <!-- TODO: Custom dropdown component -->
    <select
      id="rowCount"
      bind:value={$rowCount}
      class="block w-full rounded-sm border-2 border-gray-500 bg-gray-900 p-1 text-white"
    >
      {#each rowCountOptions as rows}
        <option value={rows}>{rows}</option>
      {/each}
    </select>
  </div>
  <button
    class="rounded-md bg-green-500 py-3 font-semibold text-gray-900 transition-colors hover:bg-green-400 active:bg-green-600"
    on:click={() => $plinkoEngine?.dropBall()}
  >
    Drop ball
  </button>
</div>
