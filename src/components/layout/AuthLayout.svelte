<script lang="ts">
	// components
	import Alert from '@components/utils/Alert.svelte';
	import AuthNav from '@components/layout/navigation/AuthNav.svelte';

	// TODO<Jake>: Transition all colors for dark mode switching
</script>

<AuthNav />
<main class="relative w-full">
	<slot />
</main>
<Alert />
