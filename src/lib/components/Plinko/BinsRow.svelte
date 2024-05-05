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

    // Always reset animation before playing. Safari has a weird behavior where
    // the animation will not play the second time if it's not cancelled.
    animation.cancel();

    animation.play();
  }

  function getBinColors(binCount: number): { background: string[]; shadow: string[] } {
    const redToYellowLength = Math.ceil(binCount / 2);
    const isBinsEven = binCount % 2 === 0;

    const RED_BG = { r: 255, g: 0, b: 63 }; // rgb(255, 0, 63)
    const YELLOW_BG = { r: 255, g: 192, b: 0 }; // rgb(255, 192, 0)
    const redToYellowBg = interpolateRgbColors(RED_BG, YELLOW_BG, redToYellowLength).map(
      ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`,
    );

    const RED_SHADOW = { r: 166, g: 0, b: 4 }; // rgb(166, 0, 4)
    const YELLOW_SHADOW = { r: 171, g: 121, b: 0 }; // rgb(171, 121, 0)
    const redToYellowShadow = interpolateRgbColors(
      RED_SHADOW,
      YELLOW_SHADOW,
      redToYellowLength,
    ).map(({ r, g, b }) => `rgb(${r}, ${g}, ${b})`);

    return {
      background: [...redToYellowBg, ...redToYellowBg.reverse().slice(isBinsEven ? 0 : 1)],
      shadow: [...redToYellowShadow, ...redToYellowShadow.reverse().slice(isBinsEven ? 0 : 1)],
    };
  }
</script>

<!-- Height clamping in mobile: From 10px at 370px viewport width to 16px at 600px viewport width -->
<div class="flex h-[clamp(10px,0.352px+2.609vw,16px)] w-full justify-center lg:h-7">
  {#if $plinkoEngine}
    <div class="flex gap-[1%]" style:width={`${($plinkoEngine.binsWidthPercentage ?? 0) * 100}%`}>
      {#each binPayouts[$rowCount][$riskLevel] as payout, binIndex}
        <!-- Font-size clamping:
              - Mobile (< 1024px): From 6px at 370px viewport width to 8px at 600px viewport width
              - Desktop (>= 1024px): From 10px at 1024px viewport width to 12px at 1100px viewport width
         -->
        <div
          use:initAnimation
          class="flex min-w-0 flex-1 items-center justify-center rounded-sm text-[clamp(6px,2.784px+0.87vw,8px)] font-bold text-gray-950 shadow-[0_2px_var(--shadow-color)] lg:rounded-md lg:text-[clamp(10px,-16.944px+2.632vw,12px)] lg:shadow-[0_3px_var(--shadow-color)]"
          style:background-color={binColors.background[binIndex]}
          style:--shadow-color={binColors.shadow[binIndex]}
        >
          {payout}{payout < 100 ? '×' : ''}
        </div>
      {/each}
    </div>
  {/if}
</div>
