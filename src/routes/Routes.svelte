<script lang="ts">
	// packages
	import { Link, Route, Router } from 'svelte-navigator';

	// components
	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import Alert from '@components/utils/Alert.svelte';
	import RouteGuard from '@routes/RouteGuard.svelte';
	import Nav from '@components/layout/Nav.svelte';

	// pages
	import Dashboard from '@pages/index.svelte';
	import IssueScanner from '@pages/issueScanner.svelte';
	import Login from '@pages/login/index.svelte';

	const isProd = process.env.isProd;
</script>

<Router basepath={isProd ? '/index.html' : '/'} primary={false}>
	<Nav />
	<main>
		<div class="relative ">
			<RouteGuard isPrivate={false} path="login">
				<Login />
			</RouteGuard>
			<RouteGuard isPrivate={false} path="forgot-password">
				<p>Forgot password</p>
			</RouteGuard>
			<RouteGuard isPrivate={true} path="">
				<Dashboard />
			</RouteGuard>
			<RouteGuard isPrivate={true} path="issue-scanner">
				<IssueScanner />
			</RouteGuard>
		</div>
	</main>
	<Alert />
</Router>
