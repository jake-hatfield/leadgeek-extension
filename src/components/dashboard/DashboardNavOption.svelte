<script lang="ts">
	// packages
	import { Link } from 'svelte-navigator';

	// components
	import Icon from '@components/utils/Icon.svelte';

	// types
	import type Dashboard from '$types/Dashboard';
	import type Widget from '$types/Widget';

	// props
	export let option: {
		dashboard: Dashboard;
		widgets: Widget[];
	};

	// state
	let hoverActive = false;

	console.log(option);

	//   TODO<Jake>: Write tests to make sure that the edit/delete buttons are visible on hover
</script>

<li
	on:mouseenter={() => (hoverActive = true)}
	on:mouseleave={() => (hoverActive = false)}
>
	<Link
		to={`./${option.dashboard.dId}`}
		class="py-3 pl-5 pr-4 hover:bg-gray-100 center-between"
	>
		<!-- icon and title -->
		<div class="flex items-center">
			<span class="inline-block h-2 w-2 rounded-full bg-teal-500" />
			<span class="ml-3 text-base">{option.dashboard.title}</span>
		</div>
		<!-- buttons -->
		{#if hoverActive}
			<div class="flex items-center" data-testId="dashboard-nav-option-actions">
				<button>
					<Icon
						type="outline"
						title="star"
						size="sm"
						class="hover:text-purple-500"
					/>
				</button>
				<button class="ml-3">
					<Icon
						type="solid"
						title="pencil"
						size="sm"
						class="hover:text-gray-900"
					/>
				</button>
				<button class="ml-3">
					<Icon
						type="solid"
						title="trash"
						size="sm"
						class="hover:text-red-300"
					/>
				</button>
			</div>
		{/if}
	</Link>
</li>
