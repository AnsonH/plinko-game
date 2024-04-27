<script lang="ts">
  import { binProbabilities } from '$lib/stores/game';
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';

  let chart: Chart | null;
  let chartCanvas: HTMLCanvasElement;

  $: binIndexes = Object.keys($binProbabilities);
  $: binProbabilitiesInPercent = Object.values($binProbabilities).map((prob) => prob * 100);

  onMount(() => {
    chart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: binIndexes,
        datasets: [
          {
            label: 'Bin Probability',
            data: binProbabilitiesInPercent,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: { display: true, text: 'Bin Number' },
          },
          y: {
            title: { display: true, text: 'Probability (%)' },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${context.parsed.y}%`;
              },
            },
          },
        },
      },
    });
  });

  $: {
    if (chart) {
      chart.data.labels = binIndexes;
      chart.data.datasets[0].data = binProbabilitiesInPercent;
      chart.update();
    }
  }
</script>

<h2 class="mb-3 text-xl font-semibold">Bins Distribution</h2>
<div class="h-[350px] w-[700px]">
  <canvas bind:this={chartCanvas} />
</div>
<table class="mt-4 text-sm">
  <thead>
    <tr>
      {#each binIndexes as binIndex}
        <th class="px-2 py-1 text-left">{binIndex}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    <tr>
      {#each binProbabilitiesInPercent as probPercent}
        <td class="w-20 px-2 py-1 tabular-nums">{probPercent.toFixed(2)}%</td>
      {/each}
    </tr>
  </tbody>
</table>
