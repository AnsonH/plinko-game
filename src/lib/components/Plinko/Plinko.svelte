<script lang="ts">
  import { onMount } from 'svelte';
  import PlinkoEngine from './PlinkoEngine';

  let rows = 8; // TODO(Anson): Read from store

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const plinkoEngine = new PlinkoEngine(canvas, rows);
    plinkoEngine.start();

    plinkoEngine.dropBall();
    const dropBallInterval = setInterval(() => plinkoEngine.dropBall(), 1000);

    return () => {
      clearInterval(dropBallInterval);
      plinkoEngine.stop();
    };
  });
</script>

<div class="w-fit">
  <canvas bind:this={canvas} />
</div>
