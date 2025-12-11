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
				borderColor?: string;
				backgroundColor?: string;
				tension?: number;
				fill?: boolean;
			}>;
		};
		title?: string;
	}

	let { data, title }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
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
