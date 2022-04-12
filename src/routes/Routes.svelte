<script lang="ts">
	// packages
	import { Router } from 'svelte-navigator';

	// components
	import AuthLayout from '@components/layout/AuthLayout.svelte';

	// pages
	import RouteLayout from './RouteLayout.svelte';

	const isProd = process.env.isProd;
</script>

<Router basepath={isProd ? '/index.html' : '/'} primary={false}>
	<AuthLayout>
		<RouteLayout />
	</AuthLayout>
</Router>
