<script lang="ts" generics="T">
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import CaretDown from 'phosphor-svelte/lib/CaretDown';

  type $$Props = Omit<HTMLSelectAttributes, 'value'> & {
    value: T;
    items: { value: T; label: string }[];
  };

  export let value: $$Props['value'];
  export let items: $$Props['items'];
</script>

<div class="relative">
  <select
    bind:value
    class="block w-full appearance-none rounded-md border-2 border-slate-600 bg-slate-900 py-2 pl-3 pr-8 text-sm text-white transition hover:cursor-pointer focus:border-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:[&:not(:disabled)]:border-slate-500"
    {...$$restProps}
  >
    {#each items as { value, label }}
      <option {value}>{label}</option>
    {/each}
  </select>
  <CaretDown class="absolute right-3 top-3 text-slate-500" weight="bold" />
</div>
