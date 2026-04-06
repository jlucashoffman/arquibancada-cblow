<script lang="ts">
    import Element from "$lib/components/element.svelte";
    import { gameMaster } from "$lib/database/data.svelte";
    import LoadingSpinner from "../loadingSpinner.svelte";

    let edition = $derived(gameMaster.data?.editions[0]?.edition);
    let interactable = $derived(edition != undefined);
</script>

<Element idName="edition_controller">
    
    <button id="change_edition" type="button" class:interactable>
    {#if edition != undefined}
    {`${edition}`}
    {:else}
    <LoadingSpinner/>
    {/if}
    </button>
    
</Element>

<style>
    :global(#edition_controller) {
    &#edition_controller._vars {
    --border-color: var(--color-element-interactive-border-color);
    --border-radius: 8px;
    --border-weight: 1px;
    }
    
    & > ._background { background: var(--color-element-interactive-bg); }

    width: fit-content;

    position: absolute;
    top: 32px;
    left: 16px;

    & #change_edition { 
    padding: 8px 16px; 
    pointer-events: none;
    } 

    & #change_edition.interactable { pointer-events: all;}
    }
</style>