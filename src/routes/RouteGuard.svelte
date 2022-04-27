<!-- TODO<Jake>: Create a custom non-private route component and conditionally render based on "isPrivate" prop -->
<script lang="ts">
	// components
	import TransitionRoute from '@routes/TransitionRoute.svelte';

	// props
	export let isPrivate = true;
	export let path: string;
	export let url: string;
</script>

{#if isPrivate}
	<TransitionRoute {path} {url}>
		<slot />
	</TransitionRoute>
{:else}
	<TransitionRoute {path} {url}>
		<slot />
	</TransitionRoute>
{/if}
