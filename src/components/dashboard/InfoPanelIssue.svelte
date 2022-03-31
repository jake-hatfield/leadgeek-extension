<script lang="ts">
	import { fly } from 'svelte/transition';

	// stores
	import { scannerIssues } from '@stores/product';

	// types
	import type Issue from '$types/Issue';

	export let issue: Issue = $scannerIssues[0];
</script>

<li transition:fly aria-label={issue.id}>
	<header>
		<h4>
			{issue.title}
		</h4>
		<p>{issue.description}</p>
	</header>
	<button
		on:click={() => {
			scannerIssues.deleteIssue(issue.id);
		}}
		aria-label="clear-issue-button">Clear issue</button
	>
</li>
