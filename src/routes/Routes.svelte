<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import PrivateRoute from '@routes/PrivateRoute.svelte';

	// pages
	import Dashboard from '@pages/index.svelte';
	import Login from '@pages/login/index.svelte';
	import Widget from '@pages/widget.svelte';
</script>

<main>
	<Route path="login">
		<Login />
	</Route>
	<PrivateRoute path="/" let:location>
		<Dashboard />
	</PrivateRoute>
	<PrivateRoute path="/:dId" let:location>
		<Dashboard />
	</PrivateRoute>
	<PrivateRoute path=":dId/:wId" let:location>
		<Widget />
	</PrivateRoute>
</main>
