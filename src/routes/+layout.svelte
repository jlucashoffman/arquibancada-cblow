<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	//import de arquivos css
	import "$lib/styles/neoreset.css";
	import "$lib/styles/reset.css";
	import "$lib/styles/main.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_outward" />
</svelte:head>

{@render children()}
