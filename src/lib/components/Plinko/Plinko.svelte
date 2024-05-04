<script lang="ts">
  import { plinkoEngine } from '$lib/stores/game';
  import type { Action } from 'svelte/action';
  import BinsRow from './BinsRow.svelte';
  import PlinkoEngine from './PlinkoEngine';

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

<div class="mx-auto h-full" style:max-width={`${PlinkoEngine.WIDTH}px`}>
  <div class="flex flex-col">
    <div class="w-fit">
      <canvas use:initPlinko width={PlinkoEngine.WIDTH} height={PlinkoEngine.HEIGHT} />
    </div>
  </div>
  <BinsRow />
</div>
