<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import PrivateRoute from '@routes/PrivateRoute.svelte';

	// pages
	import Home from '@pages/index.svelte';
	import Login from '@pages/login/index.svelte';
</script>

<main>
	<Route path="login">
		<Login />
	</Route>
	<PrivateRoute path="/" let:location>
		<Home />
	</PrivateRoute>
</main>
