<script lang="ts">
	export let data;
</script>

<div class="flex flex-row">
	<section class="flex-1 order-2">
		<div class="h-14 mb-5 pl-4 bg-slate-700 rounded-br-full flex items-center">
			<div class="ml-auto mr-14">
				<img
					class="rounded-full h-10"
					src={data.idObject.picture}
					alt={data.idObject.preferred_username}
				/>
			</div>
		</div>

		<slot />
	</section>
	<aside class="order-1 pt-16 h-screen w-72 bg-gray-900 rounded-br-3xl">
		<div class="p-4">
			<h2 class="text-white font-sans text-4xl font-bold">Friendly <br />Song Identification</h2>
		</div>
		<nav class="mt-24 p-4 text-white font-bold text-xl grid underline-offset-4">
			<!-- If navlink matches route, give underline class -->
			<a href="/dashboard">Home</a>
			<a class="mt-4" href="/dashboard/stats">Stats</a>
		</nav>
	</aside>
</div>
