<script lang="ts">
	// components
	import Badge from '@components/utils/Badge.svelte';
	import Icon from '@components/utils/Icon.svelte';
	import Skeleton from '@components/utils/Skeleton.svelte';

	// types
	import type Widget from '$types/Widget';

	// stores
	import { status } from '@stores/product';

	//   props
	export let widget: Widget;

	//   state
	let hoverActive = false;

	//   TODO<Jake>: Truncate text in widgets OR max character length in widget title (15 chars?)
</script>

{#if $status === 'idle'}
	<li class="min-h-full cs-light-400 card-100">
		<header
			class="relative flex items-end justify-between pt-3 pl-3 pr-2 pb-1.5 border-b border-200"
		>
			<h3 class="pb-1 uppercase tracking-wider font-semibold text-sm text-100">
				{widget.title}
			</h3>
			<button
				on:mouseenter={() => (hoverActive = true)}
				on:mouseleave={() => (hoverActive = false)}
				class={`relative flex items-center p-1 rounded-md border ring-gray transition-main group ${
					hoverActive
						? 'bg-gray-100 border-gray-200'
						: 'border-transparent text-gray-400'
				}`}
			>
				<Icon type="solid" title="chevron-right" />
				{#if hoverActive}
					<Badge badge={{ title: 'View details' }} position="right-8" />
				{/if}
			</button>
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
