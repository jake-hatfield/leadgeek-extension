<script lang="ts">
	import { fade } from 'svelte/transition';

	type Positions =
		| 'top-0'
		| 'right-0'
		| 'bottom-0'
		| 'left-0'
		| 'top-1'
		| 'right-1'
		| 'bottom-1'
		| 'left-1'
		| 'top-1.5'
		| 'right-1.5'
		| 'bottom-1.5'
		| 'left-1.5'
		| 'top-2'
		| 'right-2'
		| 'bottom-2'
		| 'left-2'
		| 'top-2.5'
		| 'right-2.5'
		| 'bottom-2.5'
		| 'left-2.5'
		| 'top-3'
		| 'right-3'
		| 'bottom-3'
		| 'left-3'
		| 'top-3.5'
		| 'right-3.5'
		| 'bottom-3.5'
		| 'left-3.5'
		| 'top-4'
		| 'right-4'
		| 'bottom-4'
		| 'left-4'
		| 'top-5'
		| 'right-5'
		| 'bottom-5'
		| 'left-5'
		| 'top-6'
		| 'right-6'
		| 'bottom-6'
		| 'left-6'
		| 'top-7'
		| 'right-7'
		| 'bottom-7'
		| 'left-7'
		| 'top-8'
		| 'right-8'
		| 'bottom-8'
		| 'left-8'
		| 'top-9'
		| 'right-9'
		| 'bottom-9'
		| 'left-9'
		| 'top-10'
		| 'right-10'
		| 'bottom-10'
		| 'left-10'
		| 'top-11'
		| 'right-11'
		| 'bottom-11'
		| 'left-11'
		| 'top-12'
		| 'right-12'
		| 'bottom-12'
		| 'left-12'
		| 'top-14'
		| 'right-14'
		| 'bottom-14'
		| 'left-14'
		| 'top-16'
		| 'right-16'
		| 'bottom-16'
		| 'left-16'
		| 'top-20'
		| 'right-20'
		| 'bottom-20'
		| 'left-20';

	// props
	export let badge: { title: string };
	export let position: Positions;
</script>

<span
	transition:fade={{ duration: 150 }}
	class={`absolute py-1.5 px-2 rounded-md bg-gray-900 border border-gray-800 shadow-sm text-xs text-white whitespace-nowrap ${position}`}
>
	{badge.title}
</span>
