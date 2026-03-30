<script lang="ts">
    import WatchButton from '../watchButton.svelte';


    type LinkObject = [label: string, url: string]

    const nav_links: LinkObject[] = [
        ["participantes", ""],
        ["torcidas", ""],
        ["chaveamento", ""],
        ["histórico de partidas", ""]
    ]
</script>

{#snippet link(l: LinkObject)}
    <li><a class="navbar_link label_text" href={l[1]}>{l[0]}</a></li>
{/snippet}

<nav>
    <div class="content_wrapper">
        <h1>arquibancada<br/>cblow</h1>
        <ul id="navbar_link_group">
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

        background-color: var(--color-navbar-bg);
        backdrop-filter: blur(32px);

        border-radius: 0px 0px 16px 16px;
        border-bottom: 1px solid var(--color-block-stroke-default);

        position: sticky;

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
                gap: 16px;

                &:has(.navbar_link:hover) .navbar_link:not(:hover) {
                    opacity: 0.4;
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