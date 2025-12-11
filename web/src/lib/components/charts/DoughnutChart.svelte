<script lang="ts">
	import { Chart, registerables } from 'chart.js';
	import { onMount, onDestroy } from 'svelte';

	Chart.register(...registerables);

	interface Props {
		data: {
			labels: string[];
			datasets: Array<{
				data: number[];
				backgroundColor?: string[];
				borderColor?: string[];
				borderWidth?: number;
			}>;
		};
		title?: string;
	}

	let { data, title }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'doughnut',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: true,
						position: 'right'
					},
					title: {
						display: !!title,
						text: title
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
