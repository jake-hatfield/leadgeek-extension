<script lang="ts">
	// packages
	import { link } from 'svelte-navigator';
	import { fade } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';

	// types
	import type Dashboard from '$types/Dashboard';

	// utils
	import { handleClickOutside } from '@lib/clickHelpers';

	// stores
	import { currentDashboard, layout } from '@stores/layout';

	// props
	export let colors: string[];
	export let option: Dashboard;
	export let setTargetDashboard: (dashboard: Dashboard) => {
		id: string;
		title: string;
	};
	export let toggleDashboardSelect: () => void;
	export let toggleConfirmDashboardDeleteModal: () => void;

	// state
	let editColor = false;
	let editTitle = false;
	let hoverActive = false;
	let titleValue = option.title;

	// functions
	const deactivateEditState = () => {
		editColor = false;
		editTitle = false;
	};

	const onInput = (node) => {
		node.style.width = `${titleValue.length * 9 + 20}px`;
		node.focus();
		handleClickOutside(node, {
			enabled: editTitle,
			cb: () => {
				if (titleValue.length === 0) {
					// TODO<Jake>: Set alert that dashboard name cannot be empty
					return (titleValue = option.title);
				}
				layout.editDashboardTitle(option.id, titleValue);
				deactivateEditState();
			},
		});
	};

	// TODO<Jake>: Write tests to make sure that the edit/delete buttons are visible on hover
	// TODO<Jake>: Set new color on click
</script>

<li
	class={`center-between rounded-lg hover:bg-gray-100 ring-1 ring-inset group ${
		editTitle ? 'ring-purple-500' : 'ring-transparent'
	}`}
>
	<!-- icon and title -->
	<div
		class={`relative flex items-center min-w-fit pl-4 ${
			editTitle ? 'py-[6px]' : 'py-[7px]'
		}`}
	>
		<button
			on:dblclick={() => {
				editColor = true;
			}}
			class="flex items-center outline-none"
		>
			<span
				class={`inline-block flex-none h-2.5 w-2.5 rounded-sm ${option.color}`}
			/>
		</button>
		{#if editColor}
			<aside
				use:handleClickOutside={{
					enabled: editColor,
					cb: () => (editColor = false),
				}}
				transition:fade={{ duration: 100 }}
				class="absolute top-0.5 left-9 z-40 w-64 p-3 rounded-lg bg-white shadow-sm border border-200"
			>
				<ul class="grid grid-cols-12 gap-0.5">
					{#each colors as color}
						<li class="all-center">
							<button
								on:click={() => (editColor = false)}
								class={`inline-block flex-none h-3.5 w-3.5 rounded-sm ring-1 ring-offset-1 ${
									option.color === color ? 'ring-gray-300' : 'ring-transparent'
								} hover:ring-gray-300 transition-main ${color}`}
							/>
						</li>
					{/each}
				</ul>
			</aside>
		{/if}
		{#if !editTitle}
			<button
				on:dblclick={() => {
					editTitle = true;
				}}
				class="flex-none ml-3 py-0.5 px-1.5 rounded-lg border border-white group-hover:border-gray-300 text-base cursor-text transition-main group-hover:bg-gray-200 outline-none"
			>
				{option.title}
			</button>
		{:else}
			<div class="py-px">
				<input
					use:onInput
					bind:value={titleValue}
					on:input={(e) => {
						e.currentTarget.style.width = `${
							e.currentTarget.value.length === 0
								? '150'
								: e.currentTarget.value.length * 9 + 20
						}px`;
					}}
					autocomplete="off"
					id="edit-dashboard"
					placeholder="Name this dashboard"
					class="max-w-[150px] ml-2 py-1 px-2.5 rounded-md group-hover:bg-gray-100 outline-none"
				/>
			</div>
		{/if}
	</div>
	{#if !editTitle && !editColor}
		<div
			on:mouseenter={() => (hoverActive = true)}
			on:mouseleave={() => (hoverActive = false)}
			class="relative w-full"
		>
			<button
				on:click={() => {
					currentDashboard.set(option);
					toggleDashboardSelect();
				}}
				class="py-6 block w-full outline-none"
				><!-- buttons -->
				{#if hoverActive}
					<div
						transition:fade={{ duration: 100 }}
						class="absolute top-4 right-4 flex items-center"
						data-testId="dashboard-nav-option-actions"
					>
						<button
							on:click|preventDefault|stopPropagation={() => alert('star')}
						>
							{#if option.id === layout.defaultDashboard().id}
								<Icon
									type="solid"
									title="star"
									size="sm"
									class="hover:text-purple-500"
								/>
							{:else}
								<Icon
									type="outline"
									title="star"
									size="sm"
									class="hover:text-purple-500"
								/>
							{/if}
						</button>
						<button
							on:click|preventDefault|stopPropagation={() => {
								setTargetDashboard(option);
								toggleConfirmDashboardDeleteModal();
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
			</button>
		</div>
	{/if}
</li>
