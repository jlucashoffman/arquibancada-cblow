<script lang="ts">
    import Element from "$lib/components/element.svelte";
    import BackgroundLive from "./backgroundLive.svelte";
    import ChampionshipEdition from "./championshipEdition.svelte";

</script>
<Element idName="championship_header">
    <BackgroundLive />
    <ChampionshipEdition />
    <h1>arquibancada<br/>cblow</h1>
</Element>

<style>
    :global(#championship_header) {
    width: 100%;

    & h1 {
    position: absolute;

    bottom: 16px;
    left: 16px;

    text-transform: uppercase;
    font-weight: bold;
    font-size: 3rem;
    }
    }
</style>