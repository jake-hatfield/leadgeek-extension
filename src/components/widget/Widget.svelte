<script lang="ts">
	// components
	import Skeleton from '@components/utils/Skeleton.svelte';
	import WidgetButton from '@components/widget/WidgetButton.svelte';

	// types
	import type Widget from '$types/Widget';

	// stores
	import { status } from '@stores/product';

	//   props
	export let widget: Widget;

	//   TODO<Jake>: Truncate text in widgets OR max character length in widget title (15 chars?)
</script>

{#if $status === 'idle'}
	<li class="min-h-full cs-light-400 card-100">
		<header
			class="relative flex items-end justify-between p-3 pb-1.5 border-b border-200"
		>
			<h3 class="uppercase tracking-wider font-semibold text-sm text-100">
				{widget.title}
			</h3>
			<WidgetButton id={widget.id} />
		</header>
		<ul class="pt-4 cs-light-400 rounded-b-md">
			{#each widget.data as widgetItem}
				<li class="center-between pb-4 px-3 text-100">
					<div>{widgetItem.title}</div>
					<div>{widgetItem.value}</div>
				</li>
			{/each}
		</ul>
	</li>
{:else}
	<li>
		<Skeleton width={184.25} height={197.5} />
	</li>
{/if}
