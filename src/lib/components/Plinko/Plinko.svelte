<script lang="ts">
  import { plinkoEngine } from '$lib/stores/game';
  import { onMount } from 'svelte';
  import PlinkoEngine from './PlinkoEngine';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    $plinkoEngine = new PlinkoEngine(canvas);
    $plinkoEngine.start();

    return () => {
      $plinkoEngine?.stop();
    };
  });
</script>

<div class="w-fit">
  <canvas bind:this={canvas} width={PlinkoEngine.WIDTH} height={PlinkoEngine.HEIGHT} />
</div>
