<script>
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<main class="bg-slate-800">
		<slot />
	</main>
</QueryClientProvider>

<svelte:head>
	<style>
		html,
		body {
			height: 100vh;
			width: 100vw;
		}
		main {
			height: 100%;
			width: 100%;
		}
	</style>
</svelte:head>
