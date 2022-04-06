<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import PrivateRouteGuard from '@routes/PrivateRouteGuard.svelte';
	import AuthLayout from '@components/layout/AuthLayout.svelte';

	export let path;
</script>

<Route {path} let:params let:location let:navigate>
	<PrivateRouteGuard>
		<slot {params} {location} {navigate} />
	</PrivateRouteGuard>
</Route>
