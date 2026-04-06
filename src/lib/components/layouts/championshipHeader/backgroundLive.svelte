<script lang="ts">
    import Element from "$lib/components/element.svelte";
    import { onMount } from "svelte";
    import { livestreamObserver } from "./livestreamObserver.svelte";

    onMount(() => {
        livestreamObserver.loopObserver();
        return (() => livestreamObserver.clearLoop());
    })
</script>

<Element idName="page_banner">
    {#if livestreamObserver.inLive}
    <iframe 
    id="main_stream_frame"
    title="livestream oficial cblow"
    src="https://player.kick.com/yoda?muted=true"
    frameborder="0"
    scrolling="no"></iframe>
    {:else}
    <img src="" alt="">
    {/if}
    <div id="header_banner_effect"></div>
</Element>

<style>
    :global(#page_banner) {
    &._vars {
    --border-radius: 0px 0px 16px 16px;
    }

    display: flex;

    width: 100%;
    min-height: 256px;

    overflow: hidden;

    & #header_banner_effect {
    display: block;

    position: absolute;

    width: 100%;
    height: 100%;

    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
    }
</style>