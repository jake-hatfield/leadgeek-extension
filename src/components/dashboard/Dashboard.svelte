<script lang="ts">
	// components
	import Widget from '@components/widget/Widget.svelte';

	//   global state
	import { dashboards } from '@stores/layout';

	//   TODO<Jake>: Handle null state for no widgets active
</script>

<section class="content p-3" data-testId="dashboard">
	<!-- null state for widgets -->
	{#if $dashboards[0].widgets.length === 0}
		<div class="p-3 bg-white card-200"><p>Add a widget to get started</p></div>
	{:else}
		<!-- show active widgets -->
		<ul
			class="grid grid-cols-2 grid-rows-2 gap-3"
			data-testId="dashboard-widget-list"
		>
			{#each $dashboards[0].widgets as widget}
				<Widget {widget} />
			{/each}
		</ul>
	{/if}
</section>

<style>
	section {
		height: 435.5px;
	}
</style>
