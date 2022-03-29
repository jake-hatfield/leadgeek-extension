<script lang="ts">
	// packages
	import { Link } from 'svelte-navigator';

	// components
	import Badge from '@components/utils/Badge.svelte';
	import Icon from '@components/utils/Icon.svelte';

	//   props
	export let id: string;

	//   state
	let hoverActive = false;

	//   test that the button only renders if an ID is passed to the component's link
</script>

{#if id}
	<Link to={`./${id}/`}>
		<span
			on:mouseenter={() => (hoverActive = true)}
			on:mouseleave={() => (hoverActive = false)}
			class={`relative flex items-center p-1 border rounded-md ring-gray transition-main group ${
				hoverActive
					? 'cs-purple border-purple-600'
					: 'bg-gray-100 border-200 text-gray-400'
			}`}
		>
			<Icon type="solid" title="chevron-right" class="group-hover:text-white" />
			{#if hoverActive}
				<Badge badge={{ title: 'View details' }} position="right-8" />
			{/if}
		</span>
	</Link>
{/if}
