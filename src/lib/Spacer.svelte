<script>
    export let vertical = false;
    export let spacing = '15px'
</script>

{#if vertical}
    <div style="padding-top: {spacing};"></div>
{:else}
    <div style="padding-left: {spacing};"></div>
{/if}
