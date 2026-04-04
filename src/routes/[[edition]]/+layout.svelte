<script lang="ts">
    import { gameMaster } from "$lib/database/data.svelte";
    import type { LayoutProps } from "./$types";
    import Navbar from "$lib/components/layouts/navbar/component.svelte";
    import { progressManager } from "$lib/progress.svelte";

    let { data, children }: LayoutProps = $props();

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