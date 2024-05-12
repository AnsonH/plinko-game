<script lang="ts">
  import { Select } from '$lib/components/ui';
  import { autoBetIntervalMs, rowCountOptions } from '$lib/constants/game';
  import {
    balance,
    betAmount,
    betAmountOfExistingBalls,
    plinkoEngine,
    riskLevel,
    rowCount,
  } from '$lib/stores/game';
  import { BetMode, RiskLevel } from '$lib/types';
  import { flyAndScale } from '$lib/utils/transitions';
  import { Popover } from 'bits-ui';
  import Infinity from 'phosphor-svelte/lib/Infinity';
  import Question from 'phosphor-svelte/lib/Question';
  import type { FormEventHandler } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  let betMode: BetMode = BetMode.MANUAL;

  /**
   * When `betMode` is `AUTO`, the number of bets to be placed. Zero means infinite bets.
   */
  let autoBetInput = 0;

  /**
   * Number of auto bets remaining when `betMode` is `AUTO`.
   *
   * - `number`: Finite count of how many bets left. It decrements from `autoBetInput` to 0.
   * - `null`: For infinite bets (i.e. `autoBetInput` is 0).
   */
  let autoBetsLeft: number | null = null;

  let autoBetInterval: number | null = null;

  $: isBetAmountNegative = $betAmount < 0;
  $: isBetExceedBalance = $betAmount > $balance;
  $: isAutoBetInputNegative = autoBetInput < 0;
  $: hasError = isBetAmountNegative || isBetExceedBalance || isAutoBetInputNegative;

  $: hasOutstandingBalls = Object.keys($betAmountOfExistingBalls).length > 0;

  const handleBetAmountFocusOut: FormEventHandler<HTMLInputElement> = (e) => {
    const parsedValue = parseFloat(e.currentTarget.value.trim());
    if (isNaN(parsedValue)) {
      $betAmount = -1; // If input field is empty, this forces re-render so its value resets to 0
      $betAmount = 0;
    } else {
      $betAmount = parsedValue;
    }
  };

  function resetAutoBetInterval() {
    if (autoBetInterval !== null) {
      clearInterval(autoBetInterval);
      autoBetInterval = null;
    }
  }

  function autoBetDropBall() {
    if (isBetExceedBalance) {
      resetAutoBetInterval();
      return;
    }

    // Infinite mode
    if (autoBetsLeft === null) {
      $plinkoEngine?.dropBall();
      return;
    }

    // Finite mode
    if (autoBetsLeft > 0) {
      $plinkoEngine?.dropBall();
      autoBetsLeft -= 1;
    }
    if (autoBetsLeft === 0 && autoBetInterval !== null) {
      resetAutoBetInterval();
      return;
    }
  }

  const handleAutoBetInputFocusOut: FormEventHandler<HTMLInputElement> = (e) => {
    const parsedValue = parseInt(e.currentTarget.value.trim());
    if (isNaN(parsedValue)) {
      autoBetInput = -1; // If input field is empty, this forces re-render so its value resets to 0
      autoBetInput = 0;
    } else {
      autoBetInput = parsedValue;
    }
  };

  function handleBetClick() {
    if (betMode === BetMode.MANUAL) {
      $plinkoEngine?.dropBall();
    } else if (autoBetInterval === null) {
      autoBetsLeft = autoBetInput === 0 ? null : autoBetInput;
      autoBetInterval = setInterval(autoBetDropBall, autoBetIntervalMs);
    } else if (autoBetInterval !== null) {
      resetAutoBetInterval();
    }
  }

  const betModes = [
    { value: BetMode.MANUAL, label: 'Manual' },
    { value: BetMode.AUTO, label: 'Auto' },
  ];
  const riskLevels = [
    { value: RiskLevel.LOW, label: 'Low' },
    { value: RiskLevel.MEDIUM, label: 'Medium' },
    { value: RiskLevel.HIGH, label: 'High' },
  ];
  const rowCounts = rowCountOptions.map((value) => ({ value, label: value.toString() }));
</script>

<div class="flex flex-col gap-5 bg-gray-700 p-3 lg:min-w-[300px]">
  <div class="flex gap-1 rounded-full bg-slate-900 p-1">
    {#each betModes as { value, label }}
      <button
        disabled={autoBetInterval !== null}
        on:click={() => (betMode = value)}
        class={twMerge(
          'flex-1 rounded-full py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:[&:not(:disabled)]:bg-slate-600 active:[&:not(:disabled)]:bg-slate-500',
          betMode === value && 'bg-slate-600',
        )}
      >
        {label}
      </button>
    {/each}
  </div>

  <div class="relative">
    <label for="betAmount" class="text-sm font-medium text-gray-300">Bet Amount</label>
    <div class="flex">
      <div class="relative flex-1">
        <input
          id="betAmount"
          value={$betAmount}
          on:focusout={handleBetAmountFocusOut}
          disabled={autoBetInterval !== null}
          type="number"
          min="0"
          step="0.01"
          inputmode="decimal"
          class={twMerge(
            'w-full rounded-l-md border-2 border-gray-600 bg-gray-900 py-2 pl-7 pr-2 text-sm text-white transition-colors hover:cursor-pointer focus:border-gray-500 focus:outline-none disabled:cursor-not-allowed  disabled:opacity-50 hover:[&:not(:disabled)]:border-gray-500',
            (isBetAmountNegative || isBetExceedBalance) &&
              'border-red-500 focus:border-red-400 hover:[&:not(:disabled)]:border-red-400',
          )}
        />
        <div class="absolute left-3 top-2 select-none text-gray-500" aria-hidden>$</div>
      </div>
      <button
        disabled={autoBetInterval !== null}
        on:click={() => {
          $betAmount = parseFloat(($betAmount / 2).toFixed(2));
        }}
        class="touch-manipulation bg-gray-600 px-4 font-bold diagonal-fractions text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:[&:not(:disabled)]:bg-gray-500 active:[&:not(:disabled)]:bg-gray-400"
      >
        1/2
      </button>
      <button
        disabled={autoBetInterval !== null}
        on:click={() => {
          $betAmount = parseFloat(($betAmount * 2).toFixed(2));
        }}
        class="relative touch-manipulation rounded-r-md bg-gray-600 px-4 text-sm font-bold text-white transition-colors after:absolute after:left-0 after:inline-block after:h-1/2 after:w-[2px] after:bg-gray-800 after:content-[''] disabled:cursor-not-allowed disabled:opacity-50 hover:[&:not(:disabled)]:bg-gray-500 active:[&:not(:disabled)]:bg-gray-400"
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
    <Select
      id="riskLevel"
      bind:value={$riskLevel}
      items={riskLevels}
      disabled={hasOutstandingBalls || autoBetInterval !== null}
    />
  </div>

  <div>
    <label for="rowCount" class="text-sm font-medium text-gray-300">Rows</label>
    <Select
      id="rowCount"
      bind:value={$rowCount}
      items={rowCounts}
      disabled={hasOutstandingBalls || autoBetInterval !== null}
    />
  </div>

  {#if betMode === BetMode.AUTO}
    <div>
      <div class="flex items-center gap-1">
        <label for="autoBetInput" class="text-sm font-medium text-gray-300">Number of Bets</label>
        <Popover.Root>
          <Popover.Trigger class="p-1">
            <Question class="text-gray-300" weight="bold" />
          </Popover.Trigger>
          <Popover.Content
            transition={flyAndScale}
            class="z-30 max-w-lg space-y-2 rounded-md bg-slate-600 p-3 drop-shadow-xl"
          >
            <p class="text-xs font-medium text-white">Enter '0' for unlimited bets.</p>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Root>
      </div>
      <div class="relative">
        <input
          id="autoBetInput"
          value={autoBetInterval === null ? autoBetInput : autoBetsLeft ?? 0}
          disabled={autoBetInterval !== null}
          on:focusout={handleAutoBetInputFocusOut}
          type="number"
          min="0"
          inputmode="numeric"
          class={twMerge(
            'w-full rounded-md border-2 border-gray-600 bg-gray-900 py-2 pl-3 pr-8 text-sm text-white transition-colors hover:cursor-pointer focus:border-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:[&:not(:disabled)]:border-gray-500',
            isAutoBetInputNegative && 'border-red-500 hover:border-red-400 focus:border-red-400',
          )}
        />
        {#if autoBetInput === 0}
          <Infinity class="absolute right-3 top-3 size-4 text-slate-400" weight="bold" />
        {/if}
      </div>
      {#if isAutoBetInputNegative}
        <p class="text-xs leading-5 text-red-400">This must be greater than or equal to 0.</p>
      {/if}
    </div>
  {/if}

  <button
    on:click={handleBetClick}
    disabled={hasError}
    class={twMerge(
      'touch-manipulation rounded-md bg-green-500 py-3 font-semibold text-gray-900 transition-colors hover:bg-green-400 active:bg-green-600 disabled:bg-neutral-600 disabled:text-neutral-400',
      autoBetInterval !== null && 'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600',
    )}
  >
    {#if betMode === BetMode.MANUAL}
      Drop Ball
    {:else if autoBetInterval === null}
      Start Autobet
    {:else}
      Stop Autobet
    {/if}
  </button>
</div>
