<!-- TODO<Jake>: Create a custom non-private route component and conditionally render based on "isPrivate" prop -->
<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import PrivateRoute from './PrivateRoute.svelte';
	import Transition from '@components/utils/Transition.svelte';

	// props
	export let isPrivate = true;
	export let path: string;
	export let url: string;
</script>

<Transition key={url}>
	{#if isPrivate}
		<PrivateRoute {path}>
			<slot />
		</PrivateRoute>
	{:else}
		<Route {path}>
			<slot />
		</Route>
	{/if}
</Transition>
