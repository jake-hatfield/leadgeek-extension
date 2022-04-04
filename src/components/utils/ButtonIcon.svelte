<script lang="ts">
	// components
	import Icon from '@components/utils/Icon.svelte';

	//   types
	import type IconTitles from '$types/Icon';

	// props
	export let action: any;
	export let disabled: boolean = false;
	export let title: IconTitles;
</script>

<button
	on:click={action}
	{disabled}
	class="p-1.5 bg-transparent hover:bg-gray-100 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-darkGray-100 ring-gray group transition-main"
	{...$$restProps}
>
	<Icon
		type="solid"
		{title}
		class={`${$$props.class} group-hover:text-gray-800`}
	/>
</button>
