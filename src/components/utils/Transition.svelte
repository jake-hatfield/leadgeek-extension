<script lang="ts">
	import { fly } from 'svelte/transition';

	//   props
	export let key: string | number;

	//   state
	const duration = 500;
</script>

{#key key}
	<div
		class="absolute top-0 left-0 w-full"
		in:fly={{
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
