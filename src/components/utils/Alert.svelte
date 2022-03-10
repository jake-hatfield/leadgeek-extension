<script lang="ts">
	import { fly } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';

	// types
	import type { AlertTypes } from '$types/Alert';
	import type IconTitles from '$types/Icon';

	// stores
	import { alert } from '@stores/alert';

	$: isActive = Object.values($alert).every((val) => {
		if (val === null || val === '') {
			return false;
		}

		return true;
	});

	// functions
	export const iconTitleSetter = (type: AlertTypes): IconTitles => {
		switch (type) {
			case 'danger':
				return 'exclamation';
			case 'success':
				return 'check-circle';
			case 'warning':
				return 'information-circle';
			default:
				return 'information-circle';
		}
	};

	export const iconColorSetter = (type: AlertTypes) => {
		switch (type) {
			case 'danger':
				return 'text-red-300';
			case 'success':
				return 'text-teal-400';
			case 'warning':
				return 'text-purple-300';
			default:
				return 'text-100';
		}
	};
</script>

{#if isActive}
	<aside
		transition:fly={{ duration: 150, y: 15 }}
		class="absolute bottom-3 inset-x-1 flex items-start justify-between p-5 rounded-lg opacity-90 bg-gray-900 text-white shadow-lg"
		data-testId="alert"
	>
		<!-- main icon -->
		<Icon
			type="solid"
			title={iconTitleSetter($alert.type)}
			class={iconColorSetter($alert.type)}
			size="lg"
		/>
		<div class="w-3/4 mx-5 whitespace-normal">
			<h5 class="font-semibold">
				{$alert.title}
			</h5>
			<p class="mt-1.5 text-grey-400 text-sm break-words">
				{$alert.description}
			</p>
		</div>
		<!-- close button -->
		<button
			on:click={() => alert.delete()}
			class="p-1 rounded-lg bg-gray-800 border border-gray-700 ring-gray transition-main"
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
