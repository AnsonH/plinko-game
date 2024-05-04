<script lang="ts">
  import { rowCountOptions } from '$lib/constants/game';
  import { plinkoEngine, riskLevel, rowCount } from '$lib/stores/game';
  import { RiskLevel } from '$lib/types';

  const riskLevels = [
    { value: RiskLevel.LOW, label: 'Low' },
    { value: RiskLevel.MEDIUM, label: 'Medium' },
    { value: RiskLevel.HIGH, label: 'High' },
  ];
</script>

<div class="flex min-w-[300px] flex-col gap-4 bg-gray-700 p-3">
  <div>
    <label for="riskLevel" class="text-sm font-medium text-gray-300">Risk</label>
    <select
      id="riskLevel"
      bind:value={$riskLevel}
      class="block w-full rounded-md border-2 border-gray-600 bg-gray-900 p-2 text-sm text-white transition-colors hover:cursor-pointer hover:border-gray-500"
    >
      {#each riskLevels as { value, label }}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>
  <div>
    <label for="rowCount" class="text-sm font-medium text-gray-300">Rows</label>
    <select
      id="rowCount"
      bind:value={$rowCount}
      class="block w-full rounded-md border-2 border-gray-600 bg-gray-900 p-2 text-sm text-white transition-colors hover:cursor-pointer hover:border-gray-500"
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
