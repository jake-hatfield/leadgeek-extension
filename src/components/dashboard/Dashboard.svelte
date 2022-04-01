<script lang="ts">
	// components
	import Transition from '@components/utils/Transition.svelte';
	import Widget from '@components/widget/Widget.svelte';

	// stores
	import { currentDashboard } from '@stores/layout';
</script>

<section class="h-[435.5px] p-3" data-testId="dashboard">
	<!-- null state for widgets -->
	{#if !$currentDashboard}
		<div class="p-3 bg-white card-100">
			<p>Create a dashboard to get started</p>
		</div>
	{:else if $currentDashboard.widgets.length === 0}
		<div class="p-3 bg-white card-100"><p>Add a widget to get started</p></div>
	{:else}
		<Transition key={$currentDashboard.id}>
			<!-- show active widgets -->
			<ul
				class="grid grid-cols-2 grid-rows-2 gap-3 h-[414.5px]"
				data-testId="dashboard-widget-list"
			>
				{#each $currentDashboard.widgets as widget}
					<Widget {widget} />
				{/each}
			</ul>
		</Transition>
	{/if}
</section>
