<script lang="ts">
  import { rowCountOptions } from '$lib/constants/game';
  import { balance, betAmount, plinkoEngine, riskLevel, rowCount } from '$lib/stores/game';
  import { RiskLevel } from '$lib/types';
  import { twMerge } from 'tailwind-merge';

  $: isBetAmountNegative = $betAmount < 0;
  $: isBetExceedBalance = $betAmount > $balance;
  $: hasError = isBetAmountNegative || isBetExceedBalance;

  const riskLevels = [
    { value: RiskLevel.LOW, label: 'Low' },
    { value: RiskLevel.MEDIUM, label: 'Medium' },
    { value: RiskLevel.HIGH, label: 'High' },
  ];
</script>

<div class="flex flex-col gap-5 bg-gray-700 p-3 lg:min-w-[300px]">
  <div class="relative">
    <label for="betAmount" class="text-sm font-medium text-gray-300">Bet Amount</label>
    <div class="flex">
      <div class="relative flex-1">
        <input
          id="betAmount"
          bind:value={$betAmount}
          type="number"
          min="0"
          step="0.01"
          inputmode="decimal"
          class={twMerge(
            'w-full rounded-l-md border-2 border-gray-600 bg-gray-900 py-2 pl-7 pr-2 text-sm text-white transition-colors hover:cursor-pointer hover:border-gray-500 focus:border-gray-500 focus:outline-none',
            hasError && 'border-red-500 hover:border-red-400 focus:border-red-400',
          )}
        />
        <div class="absolute left-3 top-2 select-none text-gray-500" aria-hidden>$</div>
      </div>
      <button
        on:click={() => {
          $betAmount = parseFloat(($betAmount / 2).toFixed(2));
        }}
        class="touch-manipulation bg-gray-600 px-4 font-bold diagonal-fractions text-white transition-colors hover:bg-gray-500 active:bg-gray-400"
      >
        1/2
      </button>
      <button
        on:click={() => {
          $betAmount = parseFloat(($betAmount * 2).toFixed(2));
        }}
        class="relative touch-manipulation rounded-r-md bg-gray-600 px-4 text-sm font-bold text-white transition-colors after:absolute after:left-0 after:inline-block after:h-1/2 after:w-[2px] after:bg-gray-800 after:content-[''] hover:bg-gray-500 active:bg-gray-400"
      >
        2×
      </button>
    </div>
    {#if isBetAmountNegative}
      <p class="absolute text-xs leading-5 text-red-400">
        This must be greater than or equal to 0.
      </p>
    {:else if isBetExceedBalance}
      <p class="absolute text-xs leading-5 text-red-400">Can't bet more than your balance!</p>
    {/if}
  </div>
  <div>
    <label for="riskLevel" class="text-sm font-medium text-gray-300">Risk</label>
    <select
      id="riskLevel"
      bind:value={$riskLevel}
      class="block w-full appearance-none rounded-md border-2 border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white transition-colors hover:cursor-pointer hover:border-gray-500 focus:border-gray-500 focus:outline-none"
    >
      {#each riskLevels as { value, label }}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>
  <div>
    <label for="rowCount" class="text-sm font-medium text-gray-300">Rows</label>
    <select
      id="rowCount"
      bind:value={$rowCount}
      class="block w-full appearance-none rounded-md border-2 border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white transition-colors hover:cursor-pointer hover:border-gray-500 focus:border-gray-500 focus:outline-none"
    >
      {#each rowCountOptions as rows}
        <option value={rows}>{rows}</option>
      {/each}
    </select>
  </div>
  <button
    on:click={() => $plinkoEngine?.dropBall()}
    disabled={hasError}
    class="touch-manipulation rounded-md bg-green-500 py-3 font-semibold text-gray-900 transition-colors hover:bg-green-400 active:bg-green-600 disabled:bg-neutral-600 disabled:text-neutral-400"
  >
    Drop ball
  </button>
</div>
