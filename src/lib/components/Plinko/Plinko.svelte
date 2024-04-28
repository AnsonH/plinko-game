<script lang="ts">
  import { plinkoEngine } from '$lib/stores/game';
  import type { Action } from 'svelte/action';
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

<div class="w-fit">
  <canvas use:initPlinko width={PlinkoEngine.WIDTH} height={PlinkoEngine.HEIGHT} />
</div>
