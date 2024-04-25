<script lang="ts">
  import Plinko from '$lib/components/Plinko';
  import { rowCountOptions } from '$lib/constants/plinko';
  import { binRecords, plinkoEngine, rowCount } from '$lib/stores/game';
  import { countValueOccurrences } from '$lib/utils/numbers';

  let dropBallInterval: number | null = null;

  let ballsDropped = 0;

  function startDropBallInterval() {
    dropBallInterval = setInterval(() => {
      $plinkoEngine?.dropBall();
      ++ballsDropped;
    }, 30);
  }

  $: {
    if (ballsDropped >= 1000) {
      stopDropBallInterval();
    }
  }

  function stopDropBallInterval() {
    if (dropBallInterval) {
      clearInterval(dropBallInterval);
      dropBallInterval = null;
    }
  }

  $: occurrences = countValueOccurrences($binRecords);
  $: occurrencesObj = Object.fromEntries(occurrences);
</script>

<div>
  <Plinko />
</div>
<div class="mx-4 my-8 flex items-center gap-16">
  <div class="flex items-center gap-8">
    <label for="rows">Rows</label>
    <select bind:value={$rowCount} class="border border-gray-400 p-2">
      {#each rowCountOptions as rows}
        <option value={rows}>{rows}</option>
      {/each}
    </select>
  </div>

  <button on:click={() => $plinkoEngine?.dropBall()}>Drop Ball</button>

  {#if dropBallInterval === null}
    <button on:click={startDropBallInterval}>Start Auto Drop</button>
  {:else}
    <button on:click={stopDropBallInterval}>Stop Auto Drop</button>
  {/if}
</div>
<div class="mx-4 my-4">
  Bin History:
  <ul>
    <li class="font-mono">{JSON.stringify(occurrencesObj)}</li>
    <li class="font-mono">{JSON.stringify(Object.values(occurrencesObj))}</li>
    <li>Dropped: {ballsDropped}</li>
  </ul>
</div>
