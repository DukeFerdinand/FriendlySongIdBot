<script lang="ts">
	import Spacer from '$lib/Spacer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="h-screen text-white bg-slate-950">
	<Spacer vertical spacing="100px" />
	<h1 class="text-5xl font-bold">Song ID Bot</h1>
	<p class="text-xl mt-5">The only open source Song Id platform for Twitch</p>
	<a href={data.redirect} class="btn-purple">Login with Twitch</a>
</div>
