<script lang="ts">
  import { rowCount, plinkoEngine } from '$lib/stores/game';
  import { onMount } from 'svelte';
  import PlinkoEngine from './PlinkoEngine';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    $plinkoEngine = new PlinkoEngine(canvas, $rowCount);
    $plinkoEngine.start();

    return () => {
      $plinkoEngine?.stop();
    };
  });

  $: $plinkoEngine?.updateRowCount($rowCount);
</script>

<div class="w-fit">
  <canvas bind:this={canvas} width={PlinkoEngine.WIDTH} height={PlinkoEngine.HEIGHT} />
</div>
