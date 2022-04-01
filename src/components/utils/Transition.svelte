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
			x: -5,
			duration: pageTransitionDuration,
			delay: pageTransitionDuration,
		}}
		out:fly={{ x: 5, duration: pageTransitionDuration }}
	>
		<slot />
	</div>
{/key}
