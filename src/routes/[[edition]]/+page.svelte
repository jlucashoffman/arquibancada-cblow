<script lang="ts">
    import { gameMaster } from "$lib/database/data.svelte";
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";
    import Navbar from "$lib/components/layouts/navbar/component.svelte";
    import LivePreview from "$lib/components/layouts/livePreview/component.svelte";
    import Participants from "$lib/components/layouts/participants.svelte";
    import { progressManager } from "$lib/progress.svelte";
    import Loading from "$lib/components/loading.svelte";

    let { data }: PageProps = $props();

    onMount(() => {
        gameMaster.selectedEdition = data.ed
        gameMaster.allData = data.data
        progressManager.dataLoaded = true;
    })

</script>

<Navbar/>

<main>
    <LivePreview />
    {#if progressManager.dataLoaded}
    <Participants />
    {:else}
    <Loading />
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 128px;

        box-sizing: border-box;
        padding: 64px 16px;
    }
</style>