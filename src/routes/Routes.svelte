<script lang="ts">
	// packages
	import { useLocation } from 'svelte-navigator';

	// components
	import Alert from '@components/utils/Alert.svelte';
	import TransitionRoute from '@routes/TransitionRoute.svelte';

	// pages
	import Dashboard from '@pages/index.svelte';
	import IssueScanner from '@pages/issueScanner.svelte';
	import Login from '@pages/login/index.svelte';

	const location = useLocation();

	let url = $location.pathname;
</script>

<div class="relative">
	<TransitionRoute path="login" {url}>
		<Login />
	</TransitionRoute>
	<TransitionRoute path="forgot-password" {url}>
		<p>Forgot password</p>
	</TransitionRoute>
	<TransitionRoute path="" {url}>
		<Dashboard />
	</TransitionRoute>
	<TransitionRoute path="issue-scanner" {url}>
		<IssueScanner />
	</TransitionRoute>
</div>
