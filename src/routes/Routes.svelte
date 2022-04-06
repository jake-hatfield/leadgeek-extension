<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import PrivateRoute from '@routes/PrivateRoute.svelte';

	// pages
	import Dashboard from '@pages/index.svelte';
	import IssueScanner from '@pages/issueScanner.svelte';
	import Login from '@pages/login/index.svelte';
</script>

<div>
	<Route>
		<h3>404</h3>
	</Route>
	<Route path="login">
		<Login />
	</Route>
	<AuthLayout>
		<PrivateRoute path="" let:location>
			<Dashboard />
		</PrivateRoute>
		<PrivateRoute path="issue-scanner" let:location>
			<IssueScanner />
		</PrivateRoute>
	</AuthLayout>
</div>
