<script lang="ts">
    import Element from "$lib/components/element.svelte";
    import { gameMaster } from "$lib/database/data.svelte";
</script>

<Element idName="edition_controller">
    <button id="change_edition" type="button">{`${gameMaster.data?.editions[0].edition}`}</button>
</Element>

<style>
    :global(#edition_controller) {
    &._vars {
    --border-color: var(--color-element-interactive-border-color);
    --border-radius: 8px;
    --border-weight: 1px;
    }

    width: fit-content;

    position: absolute;
    top: 32px;
    left: 16px;

    & button#change_edition { padding: 8px 16px; } 

    & ._background { background: var(--color-element-interactive-bg); }
    }
</style>