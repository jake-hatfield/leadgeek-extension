<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import Home from '@pages/Home.svelte';
	import Login from '@pages/login/Login.svelte';
	import PrivateRoute from '@routes/PrivateRoute.svelte';
</script>

<main>
	<Route path="login">
		<Login />
	</Route>
	<PrivateRoute path="/" let:location>
		<Home />
	</PrivateRoute>
</main>
