<script lang="ts">
    import Advice from "$lib/components/advice.svelte";
    import Deck from "$lib/components/layouts/deck.svelte";
</script>



<section id="cards_deck">
    <div class="content_wrapper">
    <Advice message="As imagens em breve serão adicionadas!" />
        <Deck />
    </div>
</section>

<style>
    #cards_deck {
    display: block;
    width: 100%;

    & .content_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin: 0 auto;
        margin-top: calc(128px);
    }
}
</style>