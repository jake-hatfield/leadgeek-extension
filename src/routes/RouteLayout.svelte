<script lang="ts">
	// packages
	import { Route, useLocation } from 'svelte-navigator';

	// components
	import RouteGuard from '@routes/RouteGuard.svelte';

	// pages
	import Dashboard from '@pages/index.svelte';
	import IssueScanner from '@pages/issueScanner.svelte';
	import Login from '@pages/login/index.svelte';

	const location = useLocation();

	let url = $location.pathname;
</script>

<Route>
	<h3>404</h3>
</Route>
<RouteGuard isPrivate={false} path="login" {url}>
	<Login />
</RouteGuard>
<RouteGuard isPrivate={false} path="forgot-password" {url}>
	<p>Forgot password</p>
</RouteGuard>
<RouteGuard path="" {url}>
	<Dashboard />
</RouteGuard>
<RouteGuard path="issue-scanner" {url}>
	<IssueScanner />
</RouteGuard>
