<script lang="ts">
	// packages
	import { useLocation } from 'svelte-navigator';

	// components
	import TransitionRoute from '@routes/TransitionRoute.svelte';

	// pages
	import Dashboard from '@pages/Index.svelte';
	import Scanner from '@pages/Scanner.svelte';
	import Login from '@pages/login/Index.svelte';

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
	<TransitionRoute path="scanner" {url}>
		<Scanner />
	</TransitionRoute>
	<TransitionRoute path="scanner/:category" {url}>
		<div>hello</div>
	</TransitionRoute>
</div>
