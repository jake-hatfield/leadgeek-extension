<script lang="ts">
	import { onDestroy } from 'svelte';

	// packages
	import {
		Router,
		Route,
		createMemorySource,
		createHistory,
	} from 'svelte-navigator';

	// the component to wrap in a Router
	export let component;
	// the props to pass to it
	export let componentProps;
	// A callback you can use to check if a navigation has occurred. It will be called with the new location and the action that lead to the navigation.
	export let onNavigate = () => {};
	// If true, the component will be wrapped in a Route component as well. Some features of svelte-navigator can only be used inside a Route, for example `useParams`.
	export let withRoute = false;
	// Supply an initial location to the Router
	export let initialPathname = '/';

	// const history = createHistory(createMemorySource(initialPathname));

	// const unlisten = history.listen(onNavigate);

	// onDestroy(unlisten);
</script>

<Router>
	{#if withRoute}
		<Route path="*">
			<svelte:component this={component} {...componentProps} />
		</Route>
	{:else}
		<svelte:component this={component} {...componentProps} />
	{/if}
</Router>
