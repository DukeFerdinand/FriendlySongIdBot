<script lang="ts">
	export let data;
</script>

<div class="flex">
	<img src={data.idObject.picture} alt={data.idObject.preferred_username} />
	<h1 class="text-5xl text-white">Hello, {data.idObject.preferred_username}!</h1>
</div>
