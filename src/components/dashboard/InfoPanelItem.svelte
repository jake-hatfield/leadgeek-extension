<script lang="ts">
	import { fly } from 'svelte/transition';

	// components
	import ButtonIcon from '@components/utils/ButtonIcon.svelte';

	// stores
	import { scannerIssues } from '@stores/product';

	// types
	import type Issue from '$types/Issue';

	// props
	export let issue: Issue = $scannerIssues[0];

	// state
	let hoverActive = false;

	let buttonIconProps = {
		label: 'clear-issue-button',
		testId: 'clear-issue-button',
	};
</script>

<li
	transition:fly={{ x: -15, duration: 150 }}
	on:mouseenter={() => (hoverActive = true)}
	on:mouseleave={() => (hoverActive = false)}
	aria-label={issue.id}
	class="flex items-start justify-between first:mt-0 mt-3 py-3 px-5 rounded-lg shadow"
>
	<div class="w-5/6">
		<header class="flex items-end whitespace-normal">
			<h5 class="font-semibold leading-6">
				{issue.title}
			</h5>
			<div class="flex items-center">
				<span
					class="flex-none h-[2px] w-[2px] mx-1.5 rounded-full bg-gray-400"
				/>
				<p class="text-sm text-gray-600">Some category</p>
			</div>
		</header>
		<p class="mt-1.5 text-gray-600 break-words">
			{issue.description}
		</p>
	</div>
	{#if hoverActive}
		<!-- close button -->
		<ButtonIcon
			action={() => scannerIssues.deleteIssue(issue.id)}
			title="x"
			{...buttonIconProps}
		/>
	{/if}
</li>
