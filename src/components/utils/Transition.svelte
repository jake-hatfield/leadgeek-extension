<script lang="ts">
	import { fly } from 'svelte/transition';

	//   props
	export let key;

	//   state
	const pageTransitionDuration = 300;
</script>

{#key key}
	<div
		in:fly={{
			x: -15,
			duration: pageTransitionDuration,
			delay: pageTransitionDuration,
		}}
		out:fly={{ x: 15, duration: pageTransitionDuration }}
	>
		<slot />
	</div>
{/key}
