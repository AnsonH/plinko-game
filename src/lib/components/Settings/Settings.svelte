<script lang="ts">
  import { isGameSettingsOpen } from '$lib/stores/layout';
  import { draggable } from '@neodrag/svelte';
  import GearSix from 'phosphor-svelte/lib/GearSix';
  import Close from 'phosphor-svelte/lib/X';
  import { scale } from 'svelte/transition';

  let dragHandleElement: HTMLDivElement;
</script>

<div
  in:scale={{ duration: 200 }}
  use:draggable={{ bounds: 'body', handle: dragHandleElement }}
  class="fixed bottom-8 left-8 z-50 w-[18rem] overflow-hidden rounded-md bg-slate-600 drop-shadow-lg"
>
  <div class="flex">
    <div
      bind:this={dragHandleElement}
      class="flex flex-1 cursor-move items-center gap-2 bg-slate-800 px-4 py-2"
    >
      <GearSix class="size-5 text-slate-300" weight="fill" />
      <p class="text-sm font-medium text-white">Game Settings</p>
    </div>
    <div class="ml-auto flex">
      <button
        on:click={() => ($isGameSettingsOpen = false)}
        class="bg-slate-800 px-5 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white active:bg-red-700 active:text-white"
      >
        <Close weight="bold" />
      </button>
    </div>
  </div>
  <div class="p-4">
    <div class="flex flex-col gap-4">TODO</div>
  </div>
</div>
