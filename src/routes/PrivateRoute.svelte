<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import PrivateRouteGuard from '@routes/PrivateRouteGuard.svelte';
	import AuthLayout from '@components/layouts/AuthLayout.svelte';

	export let path;
</script>

<Route {path} let:params let:location let:navigate>
	<PrivateRouteGuard>
		<AuthLayout>
			<slot {params} {location} {navigate} />
		</AuthLayout>
	</PrivateRouteGuard>
</Route>
