<script lang="ts">
	import { fly } from 'svelte/transition';

	//   props
	export let key: string | number;

	//   state
	const duration = 200;
</script>

{#key key}
	<div
		class="absolute top-0 left-0 w-full"
		in:fly={{
			delay: duration,
			duration,
			x: -150,
		}}
		out:fly={{
			duration,
			x: 150,
		}}
	>
		<slot />
	</div>
{/key}
