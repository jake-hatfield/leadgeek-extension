<script lang="ts">
	import { fly } from 'svelte/transition';

	//   props
	export let key: string | number;
	export let duration = 200;
	export let direction: 'forward' | 'backward' = 'forward';
	export let x = 50;

	$: directionFactor = direction === 'forward' ? 1 : -1;
</script>

{#key key}
	<div
		class="absolute top-0 left-0 w-full"
		in:fly={{
			delay: duration,
			duration,
			x: x * directionFactor,
		}}
		out:fly={{
			duration,
			x: -x * directionFactor,
		}}
	>
		<slot />
	</div>
{/key}
