<script lang="ts">
  import BinsDistribution from '$lib/components/BinsDistribution.svelte';
  import Plinko from '$lib/components/Plinko';
  import { rowCountOptions } from '$lib/constants/game';
  import { plinkoEngine, riskLevel, rowCount } from '$lib/stores/game';
  import { RiskLevel } from '$lib/types';

  let dropBallInterval: ReturnType<typeof setInterval> | null = null;

  let ballsDropped = 0;

  function dropSingleBall() {
    $plinkoEngine?.dropBall();
    ballsDropped += 1;
  }

  function startDropBallInterval() {
    dropBallInterval = setInterval(dropSingleBall, 10);
  }

  function stopDropBallInterval() {
    if (dropBallInterval) {
      clearInterval(dropBallInterval);
      dropBallInterval = null;
    }
  }
</script>

<svelte:head>
  <title>Plinko - Benchmark</title>
</svelte:head>

<div class="h-[570px] w-[760px]">
  <Plinko />
</div>
<div class="mx-4 my-8 flex items-center gap-16">
  <div class="flex items-center gap-4">
    <label for="rowCount">Rows</label>
    <select id="rowCount" bind:value={$rowCount} class="border border-gray-400 p-2">
      {#each rowCountOptions as rows}
        <option value={rows}>{rows}</option>
      {/each}
    </select>
  </div>

  <div class="flex items-center gap-4">
    <label for="riskLevel">Risk</label>
    <select id="riskLevel" bind:value={$riskLevel} class="border border-gray-400 p-2">
      {#each [RiskLevel.LOW, RiskLevel.MEDIUM, RiskLevel.HIGH] as riskLevel}
        <option value={riskLevel}>{riskLevel}</option>
      {/each}
    </select>
  </div>

  <button on:click={dropSingleBall} class="bg-cyan-100 p-2">Drop Ball</button>

  {#if dropBallInterval === null}
    <button on:click={startDropBallInterval} class="bg-cyan-100 p-2">Start Auto Drop</button>
  {:else}
    <button on:click={stopDropBallInterval} class="bg-cyan-100 p-2">Stop Auto Drop</button>
  {/if}

  <p>Dropped: <span>{ballsDropped}</span></p>
</div>

<div class="mx-4 my-8">
  <BinsDistribution />
</div>
