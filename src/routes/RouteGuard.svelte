<!-- TODO<Jake>: Create a custom non-private route component and conditionally render based on "isPrivate" prop -->
<script lang="ts">
	// packages
	import { useLocation } from 'svelte-navigator';

	// components
	import PrivateRoute from '@routes/PrivateRoute.svelte';
	import PublicRoute from '@routes/PublicRoute.svelte';

	// props
	export let isPrivate = true;
	export let path: string;
</script>

{#if isPrivate}
	<PrivateRoute {path} {url}>
		<slot />
	</PrivateRoute>
{:else}
	<PublicRoute {path} {url}>
		<slot />
	</PublicRoute>
{/if}
