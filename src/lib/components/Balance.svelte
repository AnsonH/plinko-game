<script lang="ts">
  import { balance } from '$lib/stores/game';

  $: balanceFormatted = $balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
</script>

<div class="flex overflow-hidden rounded-md">
  <div
    class="flex gap-2 bg-slate-900 px-3 py-2 text-sm font-semibold tabular-nums text-white sm:text-base"
  >
    <span class="text-gray-400">$</span>
    <span class="min-w-16 text-right">
      {balanceFormatted}
    </span>
  </div>
  <!-- TODO: Show pop-up dialog for adding balance -->
  <button
    class="bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 active:bg-blue-700 sm:text-base"
  >
    Add
  </button>
</div>
