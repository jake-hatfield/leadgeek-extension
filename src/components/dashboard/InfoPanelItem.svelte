<script lang="ts">
	import { fly } from 'svelte/transition';

	// components
	import IconButton from '@components/utils/IconButton.svelte';

	// stores
	import { scannerIssues } from '@stores/product';

	// types
	import type Issue from '$types/Issue';

	export let issue: Issue = $scannerIssues[0];
</script>

<li
	transition:fly
	aria-label={issue.id}
	class="flex items-start justify-between first:mt-0 mt-3 py-3 px-5 rounded-lg shadow"
>
	<div class="w-5/6">
		<header class="flex items-end whitespace-normal">
			<h5 class="font-semibold text-lg leading-6">
				{issue.title}
			</h5>
			<div class="flex items-center">
				<span class="flex-none h-1 w-1 mx-1.5  rounded-full bg-gray-400" />
				<p class="text-sm text-gray-600">Some category</p>
			</div>
		</header>
		<p class="mt-3 text-grey-400 break-words">
			{issue.description}
		</p>
	</div>

	<!-- close button -->

	<IconButton
		type="solid"
		title="x"
		action={() => scannerIssues.deleteIssue(issue.id)}
		aria-label="clear-issue-button"
	/>
</li>
