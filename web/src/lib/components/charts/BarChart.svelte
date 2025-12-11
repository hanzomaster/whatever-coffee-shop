<script lang="ts">
	import { Chart, registerables } from 'chart.js';
	import { onMount, onDestroy } from 'svelte';

	Chart.register(...registerables);

	interface Props {
		data: {
			labels: string[];
			datasets: Array<{
				label: string;
				data: number[];
				backgroundColor?: string | string[];
				borderColor?: string | string[];
				borderWidth?: number;
			}>;
		};
		title?: string;
		horizontal?: boolean;
	}

	let { data, title, horizontal = false }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'bar',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: horizontal ? 'y' : 'x',
				plugins: {
					legend: {
						display: data.datasets.length > 1,
						position: 'top'
					},
					title: {
						display: !!title,
						text: title
					}
				},
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});

	onDestroy(() => {
		chart?.destroy();
	});

	$effect(() => {
		if (chart) {
			chart.data = data;
			chart.update();
		}
	});
</script>

<div class="h-64 w-full">
	<canvas bind:this={canvas}></canvas>
</div>
