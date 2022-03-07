<script lang="ts">
	// components
	import Skeleton from '@components/utils/Skeleton.svelte';
	import WidgetButton from '@components/widget/WidgetButton.svelte';

	//   global state
	import { status } from '@stores/product';

	//   props
	export let widget: {
		title: string;
		data: { title: string; value: string | number }[];
	} = { title: '', data: [] };

	//   state
	let wId = '12345';
	let dId = '123';

	//   TODO<Jake>: Truncate text in widgets OR max character length in widget title (15 chars?)
</script>

{#if $status === 'idle'}
	<li class="bg-white card-100">
		<header
			class="relative flex items-end justify-between p-3 pb-1.5 border-b border-300"
		>
			<h3 class="uppercase tracking-wider font-semibold text-sm text-gray-700">
				{widget.title}
			</h3>
			<WidgetButton {dId} {wId} />
		</header>
		<ul class="pt-4 bg-white rounded-b-md">
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
