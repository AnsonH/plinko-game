<script lang="ts">
  import { plinkoEngine } from '$lib/stores/game';
  import type { Action } from 'svelte/action';
  import BinsRow from './BinsRow.svelte';
  import PlinkoEngine from './PlinkoEngine';

  const { WIDTH, HEIGHT } = PlinkoEngine;

  const initPlinko: Action<HTMLCanvasElement> = (node) => {
    $plinkoEngine = new PlinkoEngine(node);
    $plinkoEngine.start();

    return {
      destroy: () => {
        $plinkoEngine?.stop();
      },
    };
  };
</script>

<div class="mx-auto flex h-full flex-col px-4 pb-4" style:max-width={`${WIDTH}px`}>
  <div class="relative w-full" style:aspect-ratio={`${WIDTH} / ${HEIGHT}`}>
    <canvas use:initPlinko width={WIDTH} height={HEIGHT} class="absolute inset-0 h-full w-full" />
  </div>
  <BinsRow />
</div>
