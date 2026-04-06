<script lang="ts">
	import Element from "$lib/components/element.svelte";
</script>

<Element idName="loadingSpinner">
	<span class="spinner"></span>
</Element>

<style>
	:global(#loadingSpinner) {

	& .spinner {
	display: flex;

	width: calc(1em * sqrt(2) - 4px); /* cálculo da diagonal subtraindo do tamanho das bordas */

	aspect-ratio: 1;

	box-sizing: border-box;
	border-radius: 50%;
	border: 2px solid var(--color-spinner-background);
	border-top-color: var(--color-spinner-highlight);

	animation: spin 0.8s linear infinite;
	}}

	@keyframes spin {
	to { transform: rotate(1turn); }}

	@media (prefers-reduced-motion: reduce) {
	:global(#small_loading) .spinner {
	animation: none;
	opacity: 1;
	}}
</style>
