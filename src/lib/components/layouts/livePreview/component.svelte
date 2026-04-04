<script lang="ts">
    import WatchButton from "../../watchButton.svelte";
    import { livestreamObserver } from "./logic.svelte";
</script>

<section id="section_hero">
    <img id="banner_hero" src="assets/banner.png" alt="teste">
    <div class="content_wrapper">
        {#if livestreamObserver.inLive} 
        <div id="livestream_wrapper">
            <div id="livestream_video">
                <iframe 
                id="main_stream_frame"
                title=""
                src="https://player.kick.com/yoda?muted=true"
                frameborder="0"
                scrolling="no"></iframe>
            </div>
            <div id="livestream_box_effects"></div>
            <div id="livestream_overflow"></div>
        </div>    
        <WatchButton />
        {:else}
        <div id="not_in_live" class="panel_style">
            <h2>Yoda não está em live no momento!</h2>
        </div>
        {/if}
    </div>
</section>


<style>
    #banner_hero {
        width: 100%;
        height: 100vh;

        object-fit: cover;
        object-position: center;

        position: absolute;
        left: 0;
        z-index: -1;
    }

    #section_hero {
        display: block;
        width: 100%;
    }

    .content_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;

        margin-top: calc(128px + 64px);

        & #livestream_wrapper {
            position: relative;
            max-width: 958px;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;

            & iframe { width: 100%; aspect-ratio: 16/9; height: 100%; }
        }

        & #not_in_live {
            max-width: 958px;
            width: 100%;
            box-sizing: border-box;
            border-radius: 16px;
            padding: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>