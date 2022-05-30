<script lang="ts">
	// packages
	import highlightWords from 'highlight-words';

	// props
	export let text: string;
	export let query: string;

	$: chunks = highlightWords({ text, query });
</script>

<span aria-hidden="true">
	{#each chunks as chunk (chunk.key)}
		<span class:highlight={chunk.match}>{chunk.text}</span>
	{/each}
</span>
