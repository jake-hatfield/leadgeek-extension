<script lang="ts">
	// components
	import Widget from '@components/widget/Widget.svelte';

	// stores
	import { layout } from '@stores/layout';

	// types
	import type Dashboard from '$types/Dashboard';

	// props
	export let currentDashboard: Dashboard | null;
</script>

<section class="p-3" data-testId="dashboard">
	<!-- null state for widgets -->
	{#if $layout.length === 0 || !currentDashboard}
		<div class="p-3 bg-white card-100">
			<p>Create a dashboard to get started</p>
		</div>
	{:else if currentDashboard.widgets.length === 0}
		<div class="p-3 bg-white card-100"><p>Add a widget to get started</p></div>
	{:else}
		<!-- show active widgets -->
		<ul
			class="grid grid-cols-2 grid-rows-2 gap-3"
			data-testId="dashboard-widget-list"
		>
			{#each currentDashboard.widgets as widget}
				<Widget {widget} />
			{/each}
		</ul>
	{/if}
</section>

<style>
	section {
		min-height: 501.5px;
	}

	ul {
		min-height: 480.5px;
	}
</style>
