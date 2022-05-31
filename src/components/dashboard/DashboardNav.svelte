<script lang="ts">
	// packages
	import { fade, fly } from 'svelte/transition';

	// components
	import Button from '@components/utils/Button.svelte';
	import DashboardNavOption from '@components/dashboard/DashboardNavItem.svelte';
	import Icon from '@components/utils/Icon.svelte';
	import ButtonIcon from '@components/utils/ButtonIcon.svelte';
	import Modal from '@components/utils/Modal.svelte';
	import Skeleton from '@components/utils/Skeleton.svelte';

	// utils
	import { handleClickOutside } from '@lib/clickHelpers';

	// types
	import type Dashboard from '$types/Dashboard';

	// stores
	import { status } from '@stores/product';
	import { currentDashboard, layout } from '@stores/layout';

	// props
	export let nextDashboard: string;
	export let prevDashboard: string;

	// state
	let colors = [
		'bg-gray-900',
		'bg-red-600',
		'bg-red-300',
		'bg-yellow-400',
		'bg-teal-500',
		'bg-blue-400',
		'bg-blue-200',
		'bg-purple-500',
		'bg-purple-300',
		'bg-pink-600',
		'bg-pink-200',
		'bg-gray-400',
	];
	let newDashboard = {
		active: false,
		title: '',
		color: '',
	};
	let dashboardSelectActive = false;
	let confirmDashboardDeleteModalActive = false;
	let targetDashboard = {
		id: '',
		title: '',
	};

	// functions
	const toggleAddDashboard = () => {
		if (newDashboard.active && !newDashboard.title)
			return (newDashboard.active = !newDashboard.active);
	};

	const toggleDashboardSelect = () =>
		(dashboardSelectActive = !dashboardSelectActive);

	const toggleConfirmDashboardDeleteModal = () =>
		(confirmDashboardDeleteModalActive = !confirmDashboardDeleteModalActive);

	const getRandomColor = () => {
		const randomColor = colors[Math.floor(Math.random() * colors.length)];

		newDashboard.color = randomColor;

		return randomColor;
	};

	const initInput = (el) => {
		el.focus();
	};

	const setTargetDashboard = (dashboard: Dashboard) =>
		(targetDashboard = {
			...targetDashboard,
			id: dashboard.id,
			title: dashboard.title,
		});

	const handleNewDashboard = () => {
		if (newDashboard.active && !newDashboard.title)
			return (newDashboard.active = !newDashboard.active);

		layout.createDashboard(newDashboard.title);
		newDashboard = {
			...newDashboard,
			active: false,
			title: '',
			color: '',
		};
		// TODO<Jake>: Navigate to new dashboard by id
		return toggleAddDashboard();
	};

	//   TODO<Jake>: Create dashboard
	//   TODO<Jake>: Edit dashboard
	//   TODO<Jake>: Delete dashboard
	//   TODO<Jake>: Change the color of the dashboard once it's been created
	//   TODO<Jake>: Max character length validator for new dashboard name
	//   TODO<Jake>: Edit dashboard validation cannot completely remove title
</script>

{#if $status === 'idle'}
	<nav
		class="center-between p-3 border-b border-200"
		data-testId="dashboard-nav"
	>
		<!-- navigate dashboard left -->
		{#if prevDashboard}
			<ButtonIcon
				action={() =>
					currentDashboard.set(layout.getDashboardById(prevDashboard))}
				title="chevron-left"
			/>
		{:else}
			<span class="p-1.5">
				<Icon type="solid" title="chevron-left" class="!text-gray-300" />
			</span>
		{/if}

		<!-- dashboard select -->
		<div
			use:handleClickOutside={{
				enabled: dashboardSelectActive,
				cb: () => dashboardSelectActive && toggleDashboardSelect(),
			}}
			class="relative z-10 w-full mx-3"
		>
			<button
				name="dashboards"
				id="dashboards"
				on:click={toggleDashboardSelect}
				class="center-between w-full py-1.5 px-4 rounded-lg border border-200 text-left ring-gray"
				data-testId="dashboard-select"
			>
				{#if !$currentDashboard}
					<span class="text-gray-300">Create a dashboard...</span>
				{:else}
					<span class="flex items-center" data-testId="dashboard-select-title">
						<span
							class={`inline-block h-2.5 w-2.5 rounded-sm ${$currentDashboard.color}`}
						/>
						<span class="ml-3">{$currentDashboard.title}</span>
					</span>
				{/if}
				<Icon type="solid" title="selector" />
			</button>

			<!-- dashboard select options -->
			{#if dashboardSelectActive}
				<div
					transition:fade={{ duration: 100 }}
					class="absolute top-12 w-full cs-light-100 card-300"
				>
					<div data-testId="dashboard-select-options">
						{#if $layout.length > 0}
							<ul class="mx-3 pt-1.5">
								{#each $layout as option}
									<DashboardNavOption
										{colors}
										{option}
										{setTargetDashboard}
										{toggleDashboardSelect}
										{toggleConfirmDashboardDeleteModal}
									/>
								{/each}
							</ul>
						{:else}
							<p class="p-5 text-100">
								Create a dashboard below{' '}<span
									role="img"
									aria-label="Point down emoji">👇</span
								>
							</p>
						{/if}
					</div>
					<div
						use:handleClickOutside={{
							enabled: newDashboard.active,
							cb: () => newDashboard.active && toggleAddDashboard(),
						}}
					>
						<!-- add a dashboard -->
						{#if newDashboard.active}
							<div
								on:click={handleNewDashboard}
								transition:fly={{ y: -15, duration: 50 }}
								class="flex items-center mx-3 py-3 px-4"
							>
								<span
									class={`inline-block h-2.5 w-2.5 rounded-sm ${getRandomColor()}`}
								/>

								<input
									use:initInput
									on:click|stopPropagation
									bind:value={newDashboard.title}
									placeholder="Dashboard name"
									id="add-dashboard"
									class="w-40 ml-3 px-1 text-base outline-none"
								/>
							</div>
						{/if}
						<div class="mt-1.5 mx-3 py-1.5 border-t border-200">
							<button
								on:click={() => {
									newDashboard.active = true;
								}}
								class="flex items-center w-full py-3 px-4 rounded-lg hover:bg-purple-500 text-purple-500 hover:text-white transition-main group outline-none"
								data-testId="dashboard-select-button"
							>
								<Icon
									type="solid"
									title="plus"
									size="sm"
									class="group-hover:text-purple-100"
								/>
								<span class="ml-2">Add dashboard</span>
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- navigate dashboard right -->
		{#if nextDashboard}
			<ButtonIcon
				action={() =>
					currentDashboard.set(layout.getDashboardById(nextDashboard))}
				title="chevron-right"
			/>
		{:else}
			<span class="p-1.5">
				<Icon type="solid" title="chevron-right" class="!text-gray-300" />
			</span>
		{/if}

		<!-- confirm dashboard deletion modal -->
		{#if confirmDashboardDeleteModalActive}
			<Modal
				isActive={confirmDashboardDeleteModalActive}
				title={`Confirm deletion ${
					targetDashboard.title ? `of "${targetDashboard.title}"` : ''
				}`}
				><div slot="description">
					<p>
						Deleting a dashboard will delete all widgets within it. <span
							class="text-red-300">This action cannot be undone.</span
						>
						<span role="img" aria-label="Face screaming in fear emoji">😱</span>
					</p>
				</div>
				<div slot="action" class="center-between">
					<div />
					<Button
						title="Confirm"
						action={() => {
							layout.deleteDashboard(targetDashboard.id);
							toggleConfirmDashboardDeleteModal();
						}}
						class="w-1/2"
					/>
				</div>
			</Modal>
		{/if}
	</nav>
{:else}
	<div class="border-b border-200" data-testId="loading-skeleton">
		<Skeleton width={400} height={47.5}>
			<!-- arrow left icon -->
			<rect width={33.5} height={33.5} x={10.5} y={7.5} rx={7} ry={7} />
			<!-- select -->
			<rect width={291} height={33.5} x={54.5} y={7.5} rx={7} ry={7} />
			<!-- arrow right icon -->
			<rect width={33.5} height={33.5} x={356.5} y={7.5} rx={7} ry={7} />
		</Skeleton>
	</div>
{/if}
