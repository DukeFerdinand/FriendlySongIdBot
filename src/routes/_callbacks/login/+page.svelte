<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import Spinner from '$lib/components/spinner.svelte';

	interface ExpectedTwitchParams {
		code: string;
		scope: string;
	}

	let error = '';
	const urlParams = new URLSearchParams(window.location.search);

	if (!urlParams.get('code')) {
		error = 'No access token found, please try again.';
	}

	$: query = createQuery({
		queryKey: ['auth-token'],
		retry: false,
		refetchOnWindowFocus: false,
		queryFn: async () => {
			const res = await fetch('/_callbacks/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					code: urlParams.get('code'),
					scope: urlParams.get('scope')
				})
			});

			if (!res.ok) {
				throw new Error('Failed to login');
			}

			return res.json();
		}
	});
</script>

<div class="container mx-auto text-center pt-40">
	{#if error}
		<p class="text-2xl text-white">{error}</p>
	{:else}
		<p class="text-2xl text-white">Logging in with Twitch...</p>
		<div class="flex justify-center mt-4">
			<Spinner />
		</div>
	{/if}
	{JSON.stringify($query.data)}
	{$query.error}
</div>
