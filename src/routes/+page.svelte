<script lang="ts">
    import Crowds from "$lib/components/layouts/crowds.svelte";
    import Edition from "$lib/components/layouts/edition.svelte";
    import HeroLivePreview from "$lib/components/layouts/heroLivePreview.svelte";
    import MatchHistory from "$lib/components/layouts/matchHistory.svelte";
    import MatchKeying from "$lib/components/layouts/matchKeying.svelte";
    import Navbar from "$lib/components/layouts/navbar.svelte";
    import Participants from "$lib/components/layouts/participants.svelte";
    import { championshipEdition, livestreamObserver, progressManager } from "$lib/runes.svelte";
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";
    import Loading from "$lib/components/loading.svelte";

    let { data }: PageProps = $props();

    onMount(() => {
        livestreamObserver.loopObserver();
        championshipEdition.define(
            data.editions[0].name,
            data.editions[0].id,
            data.editions[0].brackets,
            data.editions[0].prefetched
        );

        if (championshipEdition.edition != "") progressManager.editionLoaded = true

        return(() => livestreamObserver.clearLoop());
    })

</script>

<Navbar />

<main>
    <HeroLivePreview />
    {#if !progressManager.editionLoaded} <Loading />
    {:else}
        <Edition editions={data.editions} />
        {#if progressManager.dataLoaded} <Participants /> {/if}
        
        <MatchKeying />
        <!-- <Crowds />
        <MatchHistory /> -->
        {#if !progressManager.dataLoaded} <Loading /> {/if}
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 64px;

        box-sizing: border-box;
        padding: 64px 16px;

        margin-top: 128px;
    }
</style>