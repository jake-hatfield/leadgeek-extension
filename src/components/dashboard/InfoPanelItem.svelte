<script lang="ts">
	import { fly } from 'svelte/transition';

	// components
	import ButtonIcon from '@components/utils/ButtonIcon.svelte';

	// stores
	import { scannerIssueGroups } from '@stores/product';

	// types
	import type Issue from '$types/Issue';

	// props
	export let category: string;
	export let issue: Issue;
	export let isStacked: boolean;
	export let index: number;

	// state
	let hoverActive = false;

	// https://codepen.io/prasannapegu/pen/JdyrZP
	// https://tailwindcomponents.com/component/tailwind-cards-stack

	// functions
	const calcTopPosition = (index: number) => {
		if (index === 0) return `${0}px`;

		return `${Math.floor(2.75 * (index + 0.4))}px`;
	};

	const calcWidth = (index: number) => {
		let maxWidth = 357;

		if (index === 0) {
			return `${maxWidth}px`;
		}

		// return 3% smaller element for the next 3 elements
		return `${Math.floor(maxWidth - (maxWidth / 33) * index)}px`;
	};

	const cssVariables = (node, variables) => {
		setCssVariables(node, variables);

		return {
			update(variables) {
				setCssVariables(node, variables);
			},
		};
	};

	const setCssVariables = (node, variables) => {
		for (const name in variables) {
			node.style.setProperty(`--${name}`, variables[name]);
		}
	};

	const calcZIndex = (priority: number) => {
		return Math.floor(50 / priority);
	};

	let top = calcTopPosition(index);
	let width = calcWidth(index);
	let zIndex = calcZIndex(issue.priority);
</script>

<li
	use:cssVariables={{ top, width, zIndex }}
	transition:fly={{ x: -15, duration: 150 }}
	on:mouseenter={() => (hoverActive = true)}
	on:mouseleave={() => (hoverActive = false)}
	aria-label={'issue-item'}
	class={`${index > 3 ? 'hidden' : 'flex items-start justify-between'} ${
		isStacked ? `absolute left-1/2 transform -translate-x-1/2` : 'mt-5'
	} first:mt-0 py-3 px-5 rounded-lg bg-white shadow`}
	data-testId={issue.id}
>
	<div class="w-5/6">
		<header class="flex items-center whitespace-normal">
			<h5 class="font-semibold leading-6">
				{issue.title}
			</h5>
			<span class="flex-none h-[2px] w-[2px] mx-1.5 rounded-full bg-gray-400" />
			<p class="pt-0.5 text-sm text-gray-600">{category}</p>
		</header>
		<p class="mt-1.5 text-gray-600 break-words">
			{issue.description}
		</p>
	</div>
	{#if hoverActive}
		<!-- close button -->
		<ButtonIcon
			action={() =>
				scannerIssueGroups.deleteIssue('test-category-id-1', issue.id)}
			title="x"
			aria-label="clear-issue-button"
			data-testId="clear-issue-button"
		/>
	{/if}
</li>

<style>
	li {
		top: var(--top);
		z-index: var(--zIndex);
		width: var(--width);
	}
</style>
