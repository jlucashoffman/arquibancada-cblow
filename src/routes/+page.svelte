<script lang="ts">
    import Crowds from "$lib/components/layouts/crowds.svelte";
    import HeroLivePreview from "$lib/components/layouts/heroLivePreview.svelte";
    import MatchHistory from "$lib/components/layouts/matchHistory.svelte";
    import MatchKeying from "$lib/components/layouts/matchKeying.svelte";
    import Navbar from "$lib/components/layouts/navbar.svelte";
    import Participants from "$lib/components/layouts/participants.svelte";
    import { livestreamObserver } from "$lib/runes.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        livestreamObserver.loopObserver();

        return(() => livestreamObserver.clearLoop());
    })

</script>

<Navbar />

<main>
    {#if livestreamObserver.inLive}
    <HeroLivePreview />
    {/if}
    <Participants />
    <Crowds />
    <MatchKeying />
    <MatchHistory />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 64px;

        box-sizing: border-box;
        padding: 64px 16px;
    }
</style>