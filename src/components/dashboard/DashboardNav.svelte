<script lang="ts">
	// packages
	import { fade } from 'svelte/transition';
	import { Link } from 'svelte-navigator';

	// components
	import DashboardNavOption from '@components/dashboard/DashboardNavOption.svelte';
	import Icon from '@components/utils/Icon.svelte';
	import IconButton from '@components/utils/IconButton.svelte';
	import Skeleton from '@components/utils/Skeleton.svelte';

	// utils
	import { handleClickOutside } from '@lib/clickHelpers';

	// store
	import { status } from '@stores/product';
	import { layout } from '@stores/layout';

	// props
	export let currentDashboard;
	export let nextDashboard;
	export let prevDashboard;

	// state
	let addDashboardActive = false;
	let dashboardSelectActive = false;

	// functions
	const toggleAddDashboard = () => {
		addDashboardActive = !addDashboardActive;
	};

	const toggleDashboardSelect = () => {
		dashboardSelectActive = !dashboardSelectActive;
		addDashboardActive && toggleAddDashboard();
	};

	//   TODO<Jake>: Create dashboard
	//   TODO<Jake>: Edit dashboard
	//   TODO<Jake>: Delete dashboard
	//   TODO<Jake>: Select new dashboard with drop down
</script>

{#if $status === 'idle'}
	<nav
		class="center-between py-2 px-3 border-b border-200"
		data-testId="dashboard-nav"
	>
		<!-- navigate dashboard left -->
		{#if prevDashboard}
			<Link to={`/${prevDashboard}`}>
				<IconButton iconTitle="chevron-left" class="text-purple-500" />
			</Link>
		{:else}
			<IconButton
				disabled={!prevDashboard}
				iconTitle="chevron-left"
				class="cursor-default"
			/>
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
				class="center-between w-full py-1.5 pl-5 pr-4 rounded-lg border border-200 text-left ring-gray"
				data-testId="dashboard-select"
			>
				{#if $layout.length > 0}
					<span class="flex items-center" data-testId="dashboard-select-title">
						<span class={`inline-block h-2 w-2 rounded-full bg-teal-500`} />
						<span class="ml-3">{currentDashboard.title}</span>
					</span>
				{:else}
					<span class="text-gray-300">Create a dashboard...</span>
				{/if}
				<Icon type="solid" title="selector" />
			</button>

			<!-- dashboard select options -->
			{#if dashboardSelectActive}
				<div
					class="absolute top-12 w-full cs-light-100 card-300"
					transition:fade={{ duration: 100 }}
					data-testId="dashboard-select-options"
				>
					{#if $layout.length > 0}
						<ul class="mt-1.5">
							{#each $layout as option}
								<DashboardNavOption {option} {toggleDashboardSelect} />
							{/each}
						</ul>
					{:else}
						<p class="mt-1.5 py-3 px-5 text-100">
							Create a dashboard below{' '}<span
								role="img"
								aria-label="Point down emoji">👇</span
							>
						</p>
					{/if}

					<!-- add a dashboard -->
					{#if addDashboardActive}
						<div class="py-1.5 pl-5 pr-4 bg-purple-200">
							<input
								placeholder="Name this dashboard..."
								class="pt-1.5 pb-1 px-3 bg-gray-100 rounded-lg border border-200 text-base focus:border-purple-500 dark:focus:border-purple-300 outline-none"
							/>
						</div>
					{/if}
					<button
						class="flex items-center w-full mb-1.5 py-3 px-5 hover:bg-gray-100 border-t border-200 text-purple-500"
						data-testId="dashboard-select-button"
					>
						<Icon type="solid" title="plus" size="sm" />
						<span class="ml-2">Create a dashboard</span>
					</button>
				</div>
			{/if}
		</div>

		<!-- navigate dashboard right -->
		{#if nextDashboard}
			<Link to={`/${nextDashboard}`}>
				<IconButton iconTitle="chevron-right" />
			</Link>
		{:else}
			<IconButton
				disabled={!nextDashboard}
				iconTitle="chevron-right"
				class="cursor-default"
			/>
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
