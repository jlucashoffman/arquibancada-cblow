<script lang="ts">
    import { championshipEdition } from "$lib/runes.svelte";
    import { onMount } from "svelte";

    let dropdownDiv:HTMLDivElement;

    let {editions} = $props();

    let isOpen = $state(false);

    const toggleDropdown = () => {
        if (editions.length <= 1) return
        isOpen = !isOpen
    }

    onMount(() => {
        dropdownDiv.addEventListener("click", () => {toggleDropdown()})

        return () => dropdownDiv.removeEventListener("click", () => {toggleDropdown()})
    })
</script>

<section id="edition_block">
    <div class="content_wrapper">
        <h3>Escolher edição</h3>
        <div class:opened={isOpen} class="panel_style" id="dropdown_wrapper" bind:this={dropdownDiv}>
            <ul>
            {#each editions as e}
                <li><button class:checked={e.name === championshipEdition.edition} type="button" onclick={() => championshipEdition.define(e.name, e.id, e.brackets)}>{e.name}</button></li>
            {/each}
            </ul>
        </div>
    </div>
</section>

<style>
    #edition_block {
    width: 100%;

        & .content_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;

        & #dropdown_wrapper {
        display: block;
        border-radius: 8px;
        overflow: hidden;

        &.opened ul li {
        max-height: calc(1em + 8px * 2);

            & button {
            pointer-events: all;
            }

        }

            & ul {
            display: flex;
            width: fit-content;
            flex-direction: column;

                & li {
                display: flex;
                justify-content: center;
                width: fit-content;
                max-height: 0px;
                transition: .3s max-height;
                overflow: hidden;

                &:has( .checked) {
                    max-height: calc(1em + 8px * 2) !important;
                    overflow: hidden;
                }

                    & button {
                    box-sizing: border-box;
                    padding: 8px 32px;
                    width: 100%;

                    &:hover {
                    background-color: #ffffff26;
                    background-color: oklch(1 0 0/0.15);
                    }
                    }
                }
            }
        }
        }
    }
</style>