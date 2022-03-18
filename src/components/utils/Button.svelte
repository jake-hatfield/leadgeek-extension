<script lang="ts">
	export let title: string;
	export let action: () => any;

	// TODO<Jake>: Standardize different types of buttons
</script>

<button
	on:click|preventDefault={action}
	class={`p-3 rounded-lg cs-purple font-semibold ring-purple opacity-100 ${$$props.class}`}
>
	{title}
</button>
