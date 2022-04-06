<script lang="ts">
	// packages
	import { useLocation } from 'svelte-navigator';

	// components
	import Alert from '@components/utils/Alert.svelte';
	import AuthNav from '@components/layout/navigation/AuthNav.svelte';
	import Transition from '@components/utils/Transition.svelte';

	const location = useLocation();

	$: url = $location.pathname;

	// TODO<Jake>: Transition all colors for dark mode switching
</script>

<main class="relative text-base cs-light-500 transition-colors">
	<AuthNav />
	<Transition key={url}>
		<slot />
	</Transition>
	<Alert />
</main>
