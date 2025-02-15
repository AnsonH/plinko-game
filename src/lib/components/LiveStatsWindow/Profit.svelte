<script lang="ts">
  import { winRecords } from '$lib/stores/game';
  import { formatCurrency } from '$lib/utils/numbers';
  import { twMerge } from 'tailwind-merge';

  let profit = $derived($winRecords.reduce((acc, { profit }) => acc + profit, 0));
  let wins = $derived($winRecords.filter(({ profit }) => profit >= 0).length);
  let losses = $derived($winRecords.filter(({ profit }) => profit < 0).length);

  let winsFormatted = $derived(wins.toLocaleString('en-US'));
  let lossesFormatted = $derived(losses.toLocaleString('en-US'));
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
  <div class="mx-4 w-0.5 bg-slate-600" aria-hidden="true"></div>
  <div class="flex-1 space-y-2">
    <div>
      <p class="font-medium text-slate-400">Wins</p>
      <p class="font-semibold text-green-400 tabular-nums">{winsFormatted}</p>
    </div>
    <div>
      <p class="font-medium text-slate-400">Losses</p>
      <p class="font-semibold text-red-400 tabular-nums">{lossesFormatted}</p>
    </div>
  </div>
</div>
