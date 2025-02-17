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
    class="fixed right-8 bottom-8 w-[20rem]"
  >
    {#snippet title()}
      <ChartLine weight="bold" class="text-xl text-slate-300" />
      <p class="text-sm font-medium text-white">Live Stats</p>
    {/snippet}

    {#snippet titleBarActions()}
      <Tooltip.Provider delayDuration={0} disableCloseOnTriggerClick>
        <Tooltip.Root>
          <Tooltip.Trigger
            onclick={resetLiveStats}
            class="bg-slate-800 px-5 py-3 text-slate-300 transition hover:bg-slate-700 active:bg-slate-600"
          >
            <ArrowClockwise weight="bold" />
          </Tooltip.Trigger>
          <Tooltip.Content
            forceMount
            sideOffset={4}
            class="z-50 max-w-lg rounded-md bg-white p-3 text-sm font-medium text-gray-950 drop-shadow-xl"
          >
            {#snippet child({ wrapperProps, props, open })}
              {#if open}
                <div {...wrapperProps}>
                  <div {...props} transition:flyAndScale>
                    <Tooltip.Arrow class="text-white" />
                    <p>Reset Live Stats</p>
                  </div>
                </div>
              {/if}
            {/snippet}
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    {/snippet}

    <div class="flex flex-col gap-4">
      <Profit />
      <ProfitHistoryChart />
    </div>
  </DraggableWindow>
{/if}
