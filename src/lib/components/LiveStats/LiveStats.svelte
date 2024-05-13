<script lang="ts">
  import { isLiveStatsOpen } from '$lib/stores/game';
  import { draggable } from '@neodrag/svelte';
  import ChartLine from 'phosphor-svelte/lib/ChartLine';
  import Close from 'phosphor-svelte/lib/X';
  import { scale } from 'svelte/transition';

  let dragHandleElement: HTMLDivElement;
</script>

<div
  in:scale={{ duration: 200 }}
  use:draggable={{ bounds: 'body', handle: dragHandleElement }}
  class="fixed bottom-8 right-8 z-50 w-[18rem] overflow-hidden rounded-md bg-slate-600 drop-shadow-lg"
>
  <div class="flex">
    <div
      bind:this={dragHandleElement}
      class="flex flex-1 cursor-move items-center gap-2 bg-slate-800 px-4 py-2"
    >
      <ChartLine class="size-5 text-slate-300" weight="bold" />
      <p class="text-sm font-medium text-white">Live Stats</p>
    </div>
    <button
      on:click={() => ($isLiveStatsOpen = false)}
      class="ml-auto bg-slate-800 p-3 text-slate-300 transition hover:bg-slate-700 active:bg-slate-600"
    >
      <Close weight="bold" />
    </button>
  </div>
  <div class="p-4">
    <p class="text-white">TODO</p>
  </div>
</div>
