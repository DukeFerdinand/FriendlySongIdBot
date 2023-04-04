<script lang="ts">
	import type { LineProps } from 'svelte-chartjs/Line.svelte';
	import Chart from '$lib/components/chart.svelte';

	const stats = [
		{
			title: 'Activations',
			value: 20
		},
		{
			title: 'Identifications',
			value: 10
		},
		{
			title: 'Accuracy*',
			value: '90%'
		}
	];

	const chartData: LineProps['data'] = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First dataset',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: [0, 10, 5, 2, 20, 30, 45]
			},
			{
				label: 'My Second dataset',
				backgroundColor: 'green',
				borderColor: 'green',
				data: [0, 10, 5, 2, 20, 30, 45].reverse()
			}
		]
	};
</script>

<div class="container p-10 grid grid-cols-3 gap-9">
	{#each stats as stat}
		<div class="bg-gray-200 p-4 pt-8 pb-6 rounded-xl rounded-br-3xl">
			<div>
				<p class="text-slate-700 text-5xl font-bold">{stat.value}</p>
			</div>
			<p class="mt-2 text-lg">{stat.title}</p>
		</div>
	{/each}
	<div class="col-span-3 bg-gray-200 p-4 pt-8 pb-6 rounded-xl rounded-br-3xl">
		<Chart data={chartData} />
	</div>
</div>
