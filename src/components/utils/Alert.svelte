<script lang="ts">
	import { fly } from 'svelte/transition';

	// stores
	import { alert } from '@stores/alert';

	$: isActive = Object.values($alert).every((val) => {
		if (val === null || val === '') {
			return false;
		}

		return true;
	});
</script>

{#if isActive}
	<aside
		transition:fly={{ duration: 150, y: 15 }}
		class="absolute bottom-2 w-full py-5 px-3 rounded-lg bg-gray-900 text-white"
	>
		{$alert.title} <button on:click={() => alert.delete()}>Hello</button>
	</aside>
{/if}
