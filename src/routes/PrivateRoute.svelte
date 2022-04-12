<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import PrivateRouteGuard from '@routes/PrivateRouteGuard.svelte';

	export let path: string;
</script>

<Route {path} let:params let:location let:navigate>
	<PrivateRouteGuard>
		<slot {params} {location} {navigate} />
	</PrivateRouteGuard>
</Route>
