<script lang="ts">
	import { fly } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';

	// props
	export let isActive: boolean;
	export let title: string;
</script>

{#if isActive && title}
	<aside
		transition:fly={{ duration: 150, y: -15 }}
		class="absolute -top-24 z-40 inset-x-1 rounded-lg bg-gray-900 text-white shadow-lg border border-gray-800"
		data-testId="modal"
	>
		<div class="flex items-start justify-between p-5">
			<header class="w-5/6 whitespace-normal">
				<h5 class="font-semibold text-lg">
					{title}
				</h5>
				<div class="mt-3 text-gray-400 break-words">
					<slot name="description" />
				</div>
			</header>

			<!-- close button -->
			<button
				on:click={() => (isActive = false)}
				class="p-1 rounded-lg bg-gray-800 border border-gray-700 ring-gray transition-main"
				data-testId="modal-close"
			>
				<Icon type="solid" title="x" />
			</button>
		</div>

		<!-- action -->
		<div class="p-5 rounded-b-lg bg-darkGray-100">
			<slot name="action" />
		</div>
	</aside>
{/if}
