<script lang="ts">
	// packages
	import { Link } from 'svelte-navigator';

	// components
	import Icon from '@components/utils/Icon.svelte';

	// types
	import type Dashboard from '$types/Dashboard';

	// props
	export let option: Dashboard;
	export let setTargetDashboard: (dashboard: Dashboard) => {
		id: string;
		title: string;
	};
	export let toggleDashboardSelect: () => void;
	export let toggleModal: () => void;

	// state
	let editTitle = false;
	let hoverActive = false;
	let titleValue = option.title;

	//   TODO<Jake>: Write tests to make sure that the edit/delete buttons are visible on hover
</script>

<Link to={`/${option.id}`}>
	<li
		on:mouseenter={() => (hoverActive = true)}
		on:mouseleave={() => (hoverActive = false)}
		on:click={toggleDashboardSelect}
		class="group"
	>
		<div
			class={`center-between pl-5 pr-4 rounded-lg hover:bg-gray-100 transition-main ${
				editTitle ? 'py-1.5' : 'py-2'
			}`}
		>
			<!-- icon and title -->
			<div class="py-px flex items-center">
				<span class={`inline-block h-2 w-2 rounded-full ${option.color}`} />
				{#if !editTitle}
					<span
						on:dblclick={() => (editTitle = true)}
						class="ml-3 py-0.5 px-1.5 rounded-lg border border-white group-hover:border-gray-300 hover:border-purple-500 text-base cursor-text transition-main group-hover:bg-gray-200"
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
				<div
					class="flex items-center"
					data-testId="dashboard-nav-option-actions"
				>
					<button on:click|preventDefault|stopPropagation={() => alert('star')}>
						<Icon
							type="outline"
							title="star"
							size="sm"
							class="hover:text-purple-500"
						/>
					</button>
					<button
						on:click|preventDefault|stopPropagation={() => {
							setTargetDashboard(option);
							toggleModal();
						}}
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
</Link>
