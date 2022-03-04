<script lang="ts">
	// packages
	import { fade } from 'svelte/transition';

	// components
	import DashboardNavOption from '@components/dashboard/DashboardNavOption.svelte';
	import Icon from '@components/utils/Icon.svelte';
	import IconButton from '@components/utils/IconButton.svelte';
	import Skeleton from '@components/utils/Skeleton.svelte';

	//   utils
	import { handleClickOutside } from '@lib/clickHelpers';

	//   props

	export let dashboardOptions = [
		{ title: 'Dashboard #1' },
		{ title: 'Dashboard #2' },
	];

	//   global state
	import { status } from '@stores/product';

	// state
	let dashboardSelectActive = false;

	//   functions
	const toggleDashboardSelect = () => {
		dashboardSelectActive = !dashboardSelectActive;
	};

	//   TODO<Jake>: Create dashboard
	//   TODO<Jake>: Edit dashboard
	//   TODO<Jake>: Delete dashboard
	//   TODO<Jake>: Navigate between dashboards with buttons
	//   TODO<Jake>: Select new dashboard with drop down
</script>

{#if $status === 'idle'}
	<nav
		class="center-between py-2 px-3 border-b border-300"
		data-testId="dashboard-nav"
	>
		<!-- navigate dashboard left -->
		<IconButton iconTitle="chevron-left" />

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
				class="center-between w-full py-1.5 pl-5 pr-4 rounded-lg border border-300 text-left ring-gray"
				data-testId="dashboard-select"
			>
				{#if dashboardOptions.length > 0}
					<span class="flex items-center" data-testId="dashboard-select-title">
						<span class="inline-block h-2 w-2 rounded-full bg-purple-500" />
						<span class="ml-3">Dashboard #1</span>
					</span>
				{:else}
					<span class="text-gray-300">Create a dashboard...</span>
				{/if}
				<Icon type="solid" title="chevron-down" />
			</button>

			<!-- dashboard select options -->
			{#if dashboardSelectActive}
				<div
					class="absolute top-12 w-full cs-light-100 card-300"
					transition:fade={{ duration: 100 }}
					data-testId="dashboard-select-options"
				>
					{#if dashboardOptions.length > 0}
						<ul class="mt-1.5">
							{#each dashboardOptions as option}
								<DashboardNavOption {option} />
							{/each}
						</ul>
					{:else}
						<p class="mt-1.5 py-3 px-5 text-100">
							Create a dashboard to start adding widgets{' '}<span
								role="img"
								aria-label="Point down emoji">👇</span
							>
						</p>
					{/if}
					<button
						class="flex items-center w-full mb-1.5 py-3 px-5 hover:bg-gray-100 border-t border-300 text-purple-500"
						data-testId="dashboard-select-button"
					>
						<Icon type="solid" title="plus" size="sm" />
						<span class="ml-2">Create a dashboard</span>
					</button>
				</div>
			{/if}
		</div>

		<!-- navigate dashboard right -->
		<IconButton iconTitle="chevron-right" />
	</nav>
{:else}
	<div class="border-b border-300" data-testId="loading-skeleton">
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