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
	class="p-1.5 bg-gray-100 rounded-lg border border-200 ring-gray"
>
	<Icon type="solid" {title} class={$$props.class} />
</button>
