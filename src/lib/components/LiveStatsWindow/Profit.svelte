<script lang="ts">
  import { winRecords } from '$lib/stores/game';
  import { formatCurrency } from '$lib/utils/numbers';
  import { twMerge } from 'tailwind-merge';

  $: profit = $winRecords.reduce((acc, { profit }) => acc + profit, 0);
  $: wins = $winRecords.filter(({ profit }) => profit >= 0).length;
  $: losses = $winRecords.filter(({ profit }) => profit < 0).length;

  $: winsFormatted = wins.toLocaleString('en-US');
  $: lossesFormatted = losses.toLocaleString('en-US');
</script>

<div class="flex rounded-md bg-slate-900 p-4 text-sm">
  <div class="flex-1">
    <p class="font-medium text-slate-400">Profit</p>
    <p
      class={twMerge('font-semibold tabular-nums', profit >= 0 ? 'text-green-400' : 'text-red-400')}
    >
      {formatCurrency(profit)}
    </p>
  </div>
  <div class="mx-4 w-0.5 bg-slate-600" aria-hidden />
  <div class="flex-1 space-y-2">
    <div>
      <p class="font-medium text-slate-400">Wins</p>
      <p class="font-semibold tabular-nums text-green-400">{winsFormatted}</p>
    </div>
    <div>
      <p class="font-medium text-slate-400">Losses</p>
      <p class="font-semibold tabular-nums text-red-400">{lossesFormatted}</p>
    </div>
  </div>
</div>
