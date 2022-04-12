<script lang="ts">
	// components
	import Alert from '@components/utils/Alert.svelte';
	import AuthNav from '@components/layout/navigation/AuthNav.svelte';

	// TODO<Jake>: Transition all colors for dark mode switching
</script>

<div class="relative text-base cs-light-500 transition-colors">
	<AuthNav />
	<main class="relative w-full">
		<slot />
	</main>
	<Alert />
</div>
