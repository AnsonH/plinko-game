<!--
@component
  
Available slots:
  - `title`: Title of the window
  - `title-bar-actions`: Additional action buttons in the title bar
  - Default: The window content
-->

<script lang="ts">
  import { draggable } from '@neodrag/svelte';
  import Close from 'phosphor-svelte/lib/X';
  import type { HTMLAttributes } from 'svelte/elements';
  import { scale } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Callback when the window is closed.
     */
    onClose?: () => void;
  };

  export let onClose: $$Props['onClose'] = () => {};

  let { class: className, ...restProps } = $$restProps;

  let dragHandleElement: HTMLDivElement;
</script>

<div
  in:scale={{ duration: 200 }}
  use:draggable={{ bounds: 'body', handle: dragHandleElement }}
  class={twMerge(
    'z-50 w-[15rem] overflow-hidden rounded-md bg-slate-600 drop-shadow-lg',
    className,
  )}
  {...restProps}
>
  <!-- Title bar -->
  <div class="flex">
    <div
      bind:this={dragHandleElement}
      class="flex flex-1 cursor-move items-center gap-2 bg-slate-800 px-4 py-2"
    >
      <slot name="title" />
    </div>
    <div class="ml-auto flex">
      <slot name="title-bar-actions" />
      <button
        on:click={onClose}
        class="bg-slate-800 px-5 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white active:bg-red-700 active:text-white"
      >
        <Close weight="bold" />
      </button>
    </div>
  </div>

  <!-- Content -->
  <div class="p-4">
    <slot />
  </div>
</div>
