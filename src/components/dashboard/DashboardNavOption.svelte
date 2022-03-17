<script lang="ts">
	// packages
	import { Link } from 'svelte-navigator';

	// components
	import Icon from '@components/utils/Icon.svelte';

	// types
	import type Dashboard from '$types/Dashboard';
	import { layout } from '@stores/layout';

	// props
	export let option: Dashboard;
	// export let toggleDashboardSelect: () => void;

	// state
	let editTitle = false;
	let hoverActive = false;
	let titleValue = option.title;

	//   TODO<Jake>: Write tests to make sure that the edit/delete buttons are visible on hover
</script>

<li
	on:mouseenter={() => (hoverActive = true)}
	on:mouseleave={() => (hoverActive = false)}
>
	<div
		class={`pl-5 pr-4 hover:bg-gray-100 center-between ${
			editTitle ? 'py-2' : 'py-3'
		}`}
	>
		<!-- icon and title -->
		<div class="flex items-center">
			<span class={`inline-block h-2 w-2 rounded-full ${option.color}`} />
			{#if !editTitle}
				<span
					on:dblclick={() => (editTitle = true)}
					class={`ml-3 text-base ${hoverActive ? 'bg-white' : ''}`}
					>{option.title}</span
				>
			{:else}
				<input
					class="min-w-max ml-2 py-1 px-2 rounded-md bg-white outline-none"
					bind:value={titleValue}
				/>
			{/if}
		</div>

		<!-- buttons -->
		{#if hoverActive}
			<div class="flex items-center" data-testId="dashboard-nav-option-actions">
				<button on:click|preventDefault|stopPropagation={() => alert('star')}>
					<Icon
						type="outline"
						title="star"
						size="sm"
						class="hover:text-purple-500"
					/>
				</button>
				<button
					on:click|preventDefault|stopPropagation={() =>
						layout.deleteDashboard(option.id)}
					class="ml-3"
				>
					<Icon
						type="solid"
						title="trash"
						size="sm"
						class="hover:text-red-300"
					/>
				</button>
			</div>
		{/if}
	</div>
</li>
