<script lang="ts">
	export let title: string;
	export let action: () => any;
</script>

<button
	on:click|preventDefault={action}
	class={`p-3 rounded-lg cs-purple font-semibold ring-purple ${$$props.class}`}
>
	{title}
</button>
