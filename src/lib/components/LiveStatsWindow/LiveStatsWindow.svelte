<script lang="ts">
  import { totalProfitHistory, winRecords } from '$lib/stores/game';
  import { isLiveStatsOpen } from '$lib/stores/layout';
  import { flyAndScale } from '$lib/utils/transitions';
  import { Tooltip } from 'bits-ui';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import ChartLine from 'phosphor-svelte/lib/ChartLine';
  import DraggableWindow from '../ui/DraggableWindow.svelte';
  import Profit from './Profit.svelte';
  import ProfitHistoryChart from './ProfitHistoryChart.svelte';

  function resetLiveStats() {
    $winRecords = [];
    $totalProfitHistory = [0];
  }
</script>

{#if $isLiveStatsOpen}
  <DraggableWindow
    onClose={() => ($isLiveStatsOpen = false)}
    class="fixed bottom-8 right-8 w-[20rem]"
  >
    <svelte:fragment slot="title">
      <ChartLine weight="bold" class="text-xl text-slate-300" />
      <p class="text-sm font-medium text-white">Live Stats</p>
    </svelte:fragment>

    <svelte:fragment slot="title-bar-actions">
      <Tooltip.Root openDelay={0} closeOnPointerDown={false}>
        <Tooltip.Trigger asChild let:builder>
          <button
            use:builder.action
            {...builder}
            on:click={resetLiveStats}
            class="bg-slate-800 px-5 py-3 text-slate-300 transition hover:bg-slate-700 active:bg-slate-600"
          >
            <ArrowClockwise weight="bold" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          transition={flyAndScale}
          sideOffset={4}
          class="z-30 max-w-lg rounded-md bg-white p-3 text-sm font-medium text-gray-950 drop-shadow-xl"
        >
          <Tooltip.Arrow />
          <p>Reset Live Stats</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </svelte:fragment>

    <div class="flex flex-col gap-4">
      <Profit />
      <ProfitHistoryChart />
    </div>
  </DraggableWindow>
{/if}
