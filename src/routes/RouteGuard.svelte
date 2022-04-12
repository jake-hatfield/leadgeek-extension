<!-- TODO<Jake>: Create a custom non-private route component and conditionally render based on "isPrivate" prop -->
<script lang="ts">
	// packages
	import { Route, useLocation } from 'svelte-navigator';

	// components
	import PrivateRoute from './PrivateRoute.svelte';
	import Transition from '@components/utils/Transition.svelte';

	// props
	export let isPrivate = true;
	export let path: string;

	const location = useLocation();

	let url = $location.pathname;
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
