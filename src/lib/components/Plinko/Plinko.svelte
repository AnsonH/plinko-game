<script lang="ts">
  import { rowCount } from '$lib/stores/game';
  import { onMount } from 'svelte';
  import PlinkoEngine from './PlinkoEngine';

  let canvas: HTMLCanvasElement;
  let plinkoEngine: PlinkoEngine | null = null;

  onMount(() => {
    plinkoEngine = new PlinkoEngine(canvas, $rowCount);
    plinkoEngine.start();

    plinkoEngine.dropBall();
    const dropBallInterval = setInterval(() => plinkoEngine?.dropBall(), 1000);

    return () => {
      clearInterval(dropBallInterval);
      plinkoEngine?.stop();
    };
  });

  $: plinkoEngine?.updateRowCount($rowCount);
</script>

<div class="w-fit">
  <canvas bind:this={canvas} />
</div>
