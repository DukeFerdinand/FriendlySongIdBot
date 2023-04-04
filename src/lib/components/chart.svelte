<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import type { LineProps } from 'svelte-chartjs/Line.svelte';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';

	export let data: LineProps['data'];

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
</script>

<Line {data} />
