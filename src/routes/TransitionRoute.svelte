<script lang="ts">
	// packages
	import { Route } from 'svelte-navigator';

	// components
	import Transition from '@components/utils/Transition.svelte';

	// props
	export let path: string;
	export let url: string;
</script>

<Route {path} let:params let:location let:navigate>
	<Transition key={url} duration={500} x={200}>
		<slot {params} {location} {navigate} />
	</Transition>
</Route>
