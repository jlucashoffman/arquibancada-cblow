<script lang="ts">
    import type { Snippet } from "svelte";

    let { children, className, idName }:{ children?: Snippet, className?: string, idName?:string} = $props();
</script>

<div class={`element_box _vars ${className || ""}`} id={idName}>
    <div class="element_segment _effects"></div>
    <div class="element_segment _background"></div>
    {@render children?.()}
    <div class="element_segment _border"></div>
</div>

<style>
    .element_box {
    /* toda atribuição a essas variáveis em específico devem ser feitas referenciando ._vars */
    --border-color: transparent;
    --border-radius: 0px;
    --border-weight: 0px;
    --margin-top: 0px;

    z-index: 0;
    position: relative;

    margin-top: calc(var(--margin-top) + var(--border-weight));

    border-radius: var(--border-radius);

    & > .element_segment {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    box-sizing: inherit;
    border-radius: calc(var(--border-radius) + var(--border-weight));

    &:is(._effects) { z-index: -2; }
    &:is(._background) { z-index: -1; }
    &:is(._border) { z-index: 100; }

    &:is(._border) {
    background: var(--border-color);

    box-sizing: border-box;
    padding: var(--border-weight);

    pointer-events: none;

    /* faz sumir o conteúdo interno */
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    }}}
</style>