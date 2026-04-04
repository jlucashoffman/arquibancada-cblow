<script lang="ts">
    import { gameMaster } from '$lib/database/data.svelte';
    import type { ICardCollection } from '$lib/database/interfaces';


</script>

{#snippet card(c:ICardCollection)}
    <div class="card panel_style">
        <div class="image_card_wrapper panel_style">
        </div>
        <div class="card_content_wrapper">
            <h4>{c.name}</h4>
            <p>{c.description}</p>
        </div>
    </div>
{/snippet}

<div id="deck">
    {#each gameMaster.data?.cards.filter((c) => {return c.active}) as c}
        {@render card(c)}
    {/each}
</div>

<style>
    #deck {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 16px;
        width: 100%;

        & .card {
            min-width: 256px;
            max-width: 512px;
            width: calc(100vw / 5 - 16px * 4);
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-sizing: border-box;
            padding: 16px;
            border-radius: 16px;
            aspect-ratio: 3 / 5;

            & .image_card_wrapper {
                display: block;
                aspect-ratio: 3 / 4;
                border-radius: 16px;
            }

            & .card_content_wrapper {
                display: flex;
                flex-direction: column;
                gap: 8px;

                & p {
                    font-size: 0.85rem;
                    line-height: 1.15em;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-style: italic;
                }
            }
        }
    }
</style>