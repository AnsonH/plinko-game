<script lang="ts">
  import { binProbabilitiesByRowCount } from '$lib/constants/game';
  import { binProbabilities, rowCount } from '$lib/stores/game';
  import Chart from 'chart.js/auto';
  import type { Action } from 'svelte/action';

  $: binIndexes = Object.keys($binProbabilities);
  $: binProbabilitiesInPercent = Object.values($binProbabilities).map((prob) => prob * 100);
  $: expectedProbabilitiesInPercent = binProbabilitiesByRowCount[$rowCount].map(
    (prob) => prob * 100,
  );

  const initChart: Action<
    HTMLCanvasElement,
    { labels: string[]; binProbabilities: number[]; expectedProbabilities: number[] }
  > = (node, { labels, binProbabilities, expectedProbabilities }) => {
    const chart = new Chart(node, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Bin Probability',
            data: binProbabilities,
          },
          {
            label: 'Expected Probability',
            data: expectedProbabilities,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
              label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(4)}%`,
            },
          },
        },
      },
    });

    return {
      update: ({ labels, binProbabilities, expectedProbabilities }) => {
        chart.data.labels = labels;
        chart.data.datasets[0].data = binProbabilities;
        chart.data.datasets[1].data = expectedProbabilities;
        chart.update();
      },
      destroy: () => {
        chart.destroy();
      },
    };
  };
</script>

<h2 class="mb-3 text-xl font-semibold">Bins Distribution</h2>
<div class="h-[400px] w-[800px]">
  <canvas
    use:initChart={{
      labels: binIndexes,
      binProbabilities: binProbabilitiesInPercent,
      expectedProbabilities: expectedProbabilitiesInPercent,
    }}
  />
</div>
<table class="mt-4 text-xs">
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
        <td class="w-20 px-2 py-1 tabular-nums">{probPercent.toFixed(4)}%</td>
      {/each}
    </tr>
  </tbody>
</table>
