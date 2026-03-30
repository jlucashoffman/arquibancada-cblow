<script lang="ts">
    import { navManager } from "$lib/runes.svelte";
</script>

<button type="button" onclick={() => { navManager.trigger() }}>
    {#if navManager.isOpen == false}
    <span class="material-symbols-outlined">menu</span>    
    {:else}
    <span class="material-symbols-outlined">close</span>
    {/if}
</button>

<style>
    button {
        display: none;
        @media screen and (max-width: 964px) {
            display: flex;
        }
    }
</style>