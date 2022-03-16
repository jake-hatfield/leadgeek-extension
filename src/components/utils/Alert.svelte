<script lang="ts">
	import { fly } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';

	// stores
	import { alert } from '@stores/alert';

	$: isActive = Object.values($alert).some((val) => {
		if (val === null || val === '') {
			return false;
		}

		return true;
	});
</script>

{#if isActive}
	<aside
		transition:fly={{ duration: 150, y: 15 }}
		class="absolute bottom-2 inset-x-1 flex items-start justify-between p-5 rounded-lg shadow-lg border border-gray-800 opacity-95 bg-gray-900 text-white"
		data-testId="alert"
	>
		<div class="w-5/6 whitespace-normal">
			<h5 class="font-semibold text-lg">
				{$alert.title}
			</h5>
			<p class="mt-3 text-grey-400 break-words">
				{$alert.description}
			</p>
		</div>
		<!-- close button -->
		<button
			on:click={() => alert.delete()}
			class="p-1 rounded-lg bg-gray-800 border border-gray-700 ring-gray transition-main"
			name="alert-close"
			data-testId="alert-close"
		>
			<Icon type="solid" title="x" />
		</button>
	</aside>
{/if}

<style>
	aside {
		max-width: 400px;
	}
</style>
