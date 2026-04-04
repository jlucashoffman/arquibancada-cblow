<script lang="ts">
    import { gameMaster } from "$lib/database/data.svelte";
    import type { LayoutProps } from "./$types";
    import Navbar from "$lib/components/layouts/navbar/component.svelte";
    import { progressManager } from "$lib/progress.svelte";
    import { onMount } from "svelte";
    import { livestreamObserver } from "$lib/components/layouts/livePreview/logic.svelte";

    let { data, children }: LayoutProps = $props();

    onMount(() => {
        livestreamObserver.checkYoda()

        return () => {livestreamObserver.clearLoop()}
    })

    $effect(() => {
        gameMaster.selectedEdition = data.ed
        gameMaster.allData = data.data
        progressManager.dataLoaded = true;
    })

</script>

<Navbar/>

<main>
    {@render children?.()}
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