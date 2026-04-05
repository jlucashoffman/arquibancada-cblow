<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	//import de arquivos css
	import "$lib/styles/neoreset.css";
	import "$lib/styles/reset.css";

	let { children } = $props();

	const googleIcons = "arrow_outward,close,menu,playing_cards";
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${googleIcons}`} />
</svelte:head>

{@render children()}
