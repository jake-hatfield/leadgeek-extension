<script lang="ts">
	// packages
	import { Route, Router } from 'svelte-navigator';

	// components
	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import RouteGuard from '@routes/RouteGuard.svelte';

	// pages
	import Dashboard from '@pages/index.svelte';
	import IssueScanner from '@pages/issueScanner.svelte';
	import Login from '@pages/login/index.svelte';

	const isProd = process.env.isProd;
</script>

<Router basepath={isProd ? '/index.html' : '/'} primary={false}>
	<AuthLayout>
		<Route>
			<h3>404</h3>
		</Route>
		<RouteGuard isPrivate={false} path="login">
			<Login />
		</RouteGuard>
		<RouteGuard isPrivate={false} path="forgot-password">
			<p>Forgot password</p>
		</RouteGuard>
		<RouteGuard path="">
			<Dashboard />
		</RouteGuard>
		<RouteGuard path="issue-scanner">
			<IssueScanner />
		</RouteGuard>
	</AuthLayout>
</Router>
