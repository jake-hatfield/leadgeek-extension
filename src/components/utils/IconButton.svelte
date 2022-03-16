<script lang="ts">
	// components
	import Icon from '@components/utils/Icon.svelte';

	//   types
	import type IconTitles from '$types/Icon';

	// props
	export let disabled: boolean = false;
	export let iconTitle: IconTitles;
</script>

<button
	{disabled}
	class={`p-2 bg-gray-100 rounded-lg border border-300 ring-gray `}
>
	<Icon type="solid" title={iconTitle} class={$$props.class} />
</button>
