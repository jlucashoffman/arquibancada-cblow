<script lang="ts">
    import { navManager } from '$lib/runes.svelte';
    import { onMount } from 'svelte';
    import MenuNavButton from '../menuNavButton.svelte';
    import WatchButton from '../watchButton.svelte';

    type LinkObject = [label: string, url: string]

    const nav_links: LinkObject[] = [
        ["participantes", ""],
        ["torcidas", ""],
        ["chaveamento", ""],
        ["histórico de partidas", ""]
    ]

    let isShrunk = $state(false)

    const handleScroll = () => isShrunk = window.scrollY > 64

    onMount(() => {
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    })
</script>

{#snippet link(l: LinkObject)}
    <li><a class="navbar_link label_text" href={l[1]}>{l[0]}</a></li>
{/snippet}

<nav class:nav-small={isShrunk}>
    <div class="background"></div>
    <div class="content_wrapper">   
        <MenuNavButton />
        <h1>arquibancada<br/>cblow</h1>
        <ul id="navbar_link_group" class={[navManager.isOpen ? "navbar-open" : ""].join(" ")}>
            {#each nav_links as l}
                {@render link(l)}
            {/each}
        </ul>
        <WatchButton />
    </div>
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 128px;

        position: fixed;
        top: 0;
        z-index: 10;

        transition: height .3s;

        &:is(:global(.nav-small)) {
            height: calc(64px + 16px);

            @media screen and (max-width: 964px) {
                & #navbar_link_group.navbar-open { 
                    bottom: calc(-48px - 8px) !important;
                }
            }

            @media screen and (max-width: 600px) {
                & #navbar_link_group.navbar-open { 
                    bottom: -8px !important;
                }
            }
        }

        & .background {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;

            background-color: var(--color-navbar-bg);
            backdrop-filter: blur(32px);

            border-radius: 0px 0px 16px 16px;
            border-bottom: 1px solid var(--color-block-stroke-default);
        }

        & .content_wrapper {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            max-width: calc(1440px - 16px * 2);

            position: relative;

            box-sizing: border-box;
            padding: 16px;

            & :is(h1, :global(.watch_button)) {
                position: absolute;

                &:is(h1) { left: 16px; }
                &:global(.watch_button) { right: 16px; }
            }

            & #navbar_link_group {
                display: flex;
                justify-content: center;
                gap: 16px;
                border-radius: 16px;
                backdrop-filter: blur(32px);

                &:has(.navbar_link:hover) .navbar_link:not(:hover) {
                    opacity: 0.4;
                }

                & .navbar_link {
                    display: flex;
                }
            }

            @media screen and (max-width: 964px) {
                & :is(h1, :global(.watch_button)) { position: static; }
                & h1 { margin-right: auto; }
                & #navbar_link_group { 
                    justify-content: flex-start;
                    position: absolute; 
                    transform: translateY(-50%);
                    bottom: 0px;
                    left: 16px;
                    z-index: -1;
                    width: calc(100% - 32px);

                    transition-property: bottom;
                    transition-duration: .3s;

                    &.navbar-open {
                        bottom: calc(-64px - 8px);
                    }
                }
            }

            @media screen and (max-width: 600px) {
                & :global(.watch_button) { display: none; }

                & #navbar_link_group { 
                    z-index: 10;
                    bottom: -32px;
                    transform: translate(calc(-100% - 32px), 100%);

                    display: flex;
                    flex-direction: column;

                    border: 1px solid var(--color-block-stroke-default);
                    background-color: #000000df;
                    background-color: oklch(0 0 0/0.95);

                    box-sizing: border-box;
                    padding: 16px;
                    border-radius: 16px;

                    width: calc(100% - 32px);

                    transition: transform .3s;

                    & :global(li) { width: 100%; }

                    &.navbar-open {
                        transform: translate(0px, 100%);
                        bottom: -32px;
                    }
                }
            }
        }
    }

    .navbar_link {
        transition-property: opacity;
        transition-duration: .3s;

        box-sizing: border-box;
        padding: 8px;

        position: relative;

        &:hover::after {
            width: calc(100% - 8px * 2);
        }

        &::after {
            transition-property: width;
            transition-duration: .1s;

            content: '';
            position: absolute;
            bottom: -2px;
            left: 8px;

            display: block;

            width: 0px;
            height: 2px;

            background: var(--color-brand-main);
        }
    }
</style>