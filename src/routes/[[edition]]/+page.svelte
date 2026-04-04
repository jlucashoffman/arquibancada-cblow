<script lang="ts">
    import LivePreview from "$lib/components/layouts/livePreview/component.svelte";
    import Participants from "$lib/components/layouts/participants.svelte";
    import { progressManager } from "$lib/progress.svelte";
    import Loading from "$lib/components/loading.svelte";
    import MatchHistory from "$lib/components/layouts/matchHistory.svelte";
</script>

<LivePreview />
{#if progressManager.dataLoaded}
<Participants />
<h2>Chaveamento em breve</h2>
<MatchHistory />
{:else}
<Loading />
{/if}
