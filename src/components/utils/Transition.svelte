<script lang="ts">
	import { fly } from 'svelte/transition';

	//   props
	export let key;

	//   state
	const pageTransitionDuration = 200;
</script>

{#key key}
	<div
		in:fly={{
			delay: pageTransitionDuration,
			duration: pageTransitionDuration,
			x: -15,
		}}
		out:fly={{
			duration: pageTransitionDuration,
			x: 15,
		}}
	>
		<slot />
	</div>
{/key}
