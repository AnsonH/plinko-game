<script lang="ts">
  import { isLiveStatsOpen, totalProfitHistory, winRecords } from '$lib/stores/game';
  import { draggable } from '@neodrag/svelte';
  import ChartLine from 'phosphor-svelte/lib/ChartLine';
  import Close from 'phosphor-svelte/lib/X';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import { scale } from 'svelte/transition';
  import Profit from './Profit.svelte';
  import ProfitHistoryChart from './ProfitHistoryChart.svelte';
  import { Tooltip } from 'bits-ui';
  import { flyAndScale } from '$lib/utils/transitions';

  let dragHandleElement: HTMLDivElement;

  function resetLiveStats() {
    $winRecords = [];
    $totalProfitHistory = [0];
  }
</script>

<div
  in:scale={{ duration: 200 }}
  use:draggable={{ bounds: 'body', handle: dragHandleElement }}
  class="fixed bottom-8 right-8 z-50 w-[20rem] overflow-hidden rounded-md bg-slate-600 drop-shadow-lg"
>
  <div class="flex">
    <div
      bind:this={dragHandleElement}
      class="flex flex-1 cursor-move items-center gap-2 bg-slate-800 px-4 py-2"
    >
      <ChartLine class="size-5 text-slate-300" weight="bold" />
      <p class="text-sm font-medium text-white">Live Stats</p>
    </div>
    <div class="ml-auto flex">
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

      <button
        on:click={() => ($isLiveStatsOpen = false)}
        class="bg-slate-800 px-5 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white active:bg-red-700 active:text-white"
      >
        <Close weight="bold" />
      </button>
    </div>
  </div>
  <div class="p-4">
    <div class="flex flex-col gap-4">
      <Profit />
      <ProfitHistoryChart />
    </div>
  </div>
</div>
