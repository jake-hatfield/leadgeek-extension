<script lang="ts">
	import { fly } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';

	// props
	export let isActive: boolean;
	export let title: string;
</script>

{#if isActive}
	<aside
		transition:fly={{ duration: 150, y: 15 }}
		class="absolute top-3 z-40 inset-x-1 flex items-start justify-between p-3 rounded-lg opacity-90 bg-gray-900 text-white shadow-lg"
		data-testId="modal"
	>
		<div class="flex items-start">
			<div class="mx-6">
				<h5 class="text-lg">
					{title}
				</h5>
				<div class="text-grey-400"><slot /></div>
			</div>
			<!-- close button -->
			<button
				on:click={() => (isActive = false)}
				class="p-1 rounded-lg bg-gray-800 border border-gray-700 ring-gray transition-main"
				data-testId="modal-close"
			>
				<Icon type="solid" title="x" />
			</button>
		</div>
	</aside>
{/if}
