<script lang="ts">
  import { binPayouts } from '$lib/constants/game';
  import { plinkoEngine, riskLevel, rowCount, winRecords } from '$lib/stores/game';
  import { interpolateRgbColors } from '$lib/utils/colors';
  import type { Action } from 'svelte/action';

  /**
   * Bounce animations for each bin, which is played when a ball falls into the bin.
   */
  let binAnimations: Animation[] = [];

  $: binCount = $rowCount + 1;
  $: binColors = getBinColors(binCount);

  $: {
    if ($winRecords.length) {
      const lastWinBinIndex = $winRecords[$winRecords.length - 1].binIndex;
      playAnimation(lastWinBinIndex);
    }
  }

  const initAnimation: Action<HTMLDivElement> = (node) => {
    const bounceAnimation = node.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(30%)' },
        { transform: 'translateY(0)' },
      ],
      {
        duration: 300,
        easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
      },
    );
    bounceAnimation.pause(); // Don't run the animation immediately
    binAnimations.push(bounceAnimation);
  };

  function playAnimation(binIndex: number) {
    const animation = binAnimations[binIndex];
    if (animation.playState === 'running') {
      animation.cancel();
    }
    animation.play();
  }

  function getBinColors(binCount: number): string[] {
    const redToYellowLength = Math.ceil(binCount / 2);

    const RED = { r: 255, g: 0, b: 63 }; // rgb(255, 0, 63)
    const YELLOW = { r: 255, g: 192, b: 0 }; // rgb(255, 192, 0)

    const redToYellow = interpolateRgbColors(RED, YELLOW, redToYellowLength).map(
      ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`,
    );
    return [...redToYellow, ...redToYellow.reverse().slice(binCount % 2 === 0 ? 0 : 1)];
  }
</script>

<div class="flex h-7 w-full justify-center">
  <div class="flex gap-[1%]" style:width={`${($plinkoEngine?.binsWidthPercentage ?? 0) * 100}%`}>
    {#each binPayouts[$rowCount][$riskLevel] as payout, binIndex}
      <div
        use:initAnimation
        class="flex flex-1 items-center justify-center rounded-md text-xs font-bold text-gray-950"
        style:background-color={binColors[binIndex]}
      >
        {payout}×
      </div>
    {/each}
  </div>
</div>
