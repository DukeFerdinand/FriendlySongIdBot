<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import Spinner from '$lib/components/spinner.svelte';

	interface ExpectedTwitchParams {
		access_token: string;
		id_token: string;
		scope: string;
		token_type: string;
	}

	let error = '';
	const hashParams: ExpectedTwitchParams = window.location.hash
		.slice(1)
		.split('&')
		.reduce((acc, param) => {
			const [key, value] = param.split('=');
			acc[key] = value;
			return acc;
		}, {} as Record<string, string>) as unknown as ExpectedTwitchParams;

	if (!hashParams.access_token) {
		error = 'No access token found, please try again.';
	}

	$: query = createQuery({
		queryKey: ['login', hashParams.access_token],
		queryFn: async () => {
			const res = await fetch('/_callbacks/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(hashParams)
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
