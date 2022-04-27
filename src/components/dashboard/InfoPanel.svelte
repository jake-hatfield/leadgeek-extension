<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	// components
	import ButtonIcon from '@components/utils/ButtonIcon.svelte';
	import InfoPanelItem from '@components/dashboard/InfoPanelItem.svelte';
	import Loader from '@components/utils/Loader.svelte';

	// lib
	import { pluralize } from '@lib/stringHelpers';

	// stores
	import {
		scannerStatus,
		scannerIssueGroups,
		scannerIssues,
	} from '@stores/product';
	import { onMount } from 'svelte';

	// state
	let buttonActive = true;
	let currentSortingHeader = 0;
	let currentSortKey = '';
	let issuesPanelActive = false;

	$: allIssues = $scannerIssues.length;

	// reactive state
	$: sortingHeaders = [
		{
			title: 'All',
			value: allIssues,
			sortKey: '',
		},
		{
			title: 'Urgent',
			value: $scannerIssues.filter((i) => i.sortKey === 'urgent').length,
			sortKey: 'urgent',
		},
	];

	//  functions

	const toggleIssues = () => {
		issuesPanelActive = !issuesPanelActive;
	};

	const toggleButton = () => {
		buttonActive = !buttonActive;
	};

	onMount(() => {
		setTimeout(() => {
			scannerStatus.set('idle');
		}, 500);
	});

	// $: issues =
	// 	currentSortKey !== ''
	// 		? $scannerIssueGroups.filter((i) => i.sortKey === currentSortKey)
	// 		: $scannerIssueGroups;

	$: issues = $scannerIssueGroups;

	// TODO<Jake>: Loading icon while issue scanner is processing - don't block rendering while analysing a product
</script>

<section>
	<div class="absolute z-20 bottom-3 left-1/2 transform -translate-x-1/2">
		<!-- button  -->
		{#if buttonActive}
			<div
				in:fade={{ delay: 400 }}
				out:fade
				class={`w-full rounded-lg whitespace-nowrap shadow transition-main ${
					buttonActive && $scannerIssueGroups.length === 0
						? 'bg-teal-200 border-teal-500 text-teal-900'
						: 'bg-gray-900 text-white hover:shadow-lg'
				}`}
			>
				{#if $scannerStatus === 'loading'}
					<div class="flex items-center p-3">
						<Loader />
						<p class="ml-3">Scanning for potential issues</p>
					</div>
				{:else if $scannerStatus === 'idle'}
					{#if allIssues !== 0}
						<div>
							<button
								on:click={() => {
									toggleButton();
									toggleIssues();
								}}
								class="p-3"
								data-testId="info-panel-button-active"
							>
								{pluralize(allIssues, 'issue')}
								{allIssues === 1 ? 'requires' : 'require'} your attention 🔎
							</button>
							<span class="absolute -top-1 -right-1 flex h-3 w-3">
								<span
									class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
								/>
								<span
									class="relative inline-flex rounded-full h-3 w-3 bg-red-300 border border-red-400"
								/>
							</span>
						</div>
					{:else}
						<button
							on:click={toggleButton}
							data-testId="info-panel-button-inactive"
							class="p-3"
						>
							No issues found <span role="img" aria-label="Party emoji">🎉</span
							>
						</button>
					{/if}
				{/if}
			</div>
		{/if}
	</div>

	<!-- issues panel -->
	{#if issuesPanelActive}
		<section
			transition:fly={{ y: 300, duration: 400 }}
			class="absolute -top-14 z-30 max-w-[400px] w-full h-full bg-white"
			data-testId="info-panel-details"
		>
			<header class="center-between p-3 border-b border-200">
				<h2 class="text-xl font-semibold">Issues</h2>
				<ButtonIcon
					action={() => {
						toggleIssues();
						toggleButton();
					}}
					title="x"
					data-testId="info-panel-close-button"
				/>
			</header>
			<div
				class="center-between pt-3 px-3 border-b border-200"
				data-testId="info-panel-sorting-headers"
			>
				<ul aria-label="sorting-headers" class="flex items-center">
					{#each sortingHeaders as sortingHeader, i}
						<li class="first:ml-0 ml-3">
							<button
								on:click={() => {
									currentSortingHeader = i;
									currentSortKey = sortingHeader.sortKey;
								}}
								class={`flex items-end -mb-px pb-3 px-1.5 font-semibold group border-b-2 outline-none ${
									currentSortingHeader === i
										? 'border-purple-500'
										: 'border-transparent hover:border-purple-500 transition-main'
								}`}
							>
								<h3
									class={`leading-4 ${
										currentSortingHeader === i
											? 'text-gray-900'
											: 'text-gray-400 group-hover:text-gray-900'
									}`}
								>
									{sortingHeader.title}
								</h3>
								<span
									class={`all-center h-5 w-5 ml-2.5 p-0.5 rounded-md  shadow-sm font-semibold text-xs ${
										currentSortingHeader === i
											? 'bg-gray-900 dark:bg-darkGray-200 text-white'
											: 'bg-gray-200 group-hover:bg-gray-900 dark:bg-darkGray-200 group-hover:shadow text-gray-400 group-hover:text-white'
									}`}
									>{sortingHeader.value}
								</span>
							</button>
						</li>
					{/each}
				</ul>
				<button
					on:click={() =>
						scannerIssueGroups.createIssue('test-category-id-3', {
							description: 'YO',
							priority: 2,
							sortKey: 'urgent',
							title: 'REE',
						})}
				>
					Create a new issue
				</button>
				<button
					on:click={() => {
						scannerIssueGroups.set([]);
						toggleIssues();
					}}
					class="mb-2 text-purple-500 hover:text-purple-600 outline-none transition-main"
					data-testId="info-panel-button-clear-all"
				>
					Clear all
				</button>
			</div>
			<div class="h-full">
				<ul class="p-3" data-testId="info-panel-details-issue-items">
					{#each issues as issueGroup}
						{#if issueGroup.children.length > 1}
							<li class="first:mt-0 mt-6">
								<ul class="relative h-[68px] w-full">
									{#each issueGroup.children as issue, i}
										<InfoPanelItem
											category={issueGroup.category}
											{issue}
											isStacked={true}
											index={i}
										/>
									{/each}
								</ul>
							</li>
						{:else}
							<InfoPanelItem
								category={issueGroup.category}
								issue={issueGroup.children[0]}
								isStacked={false}
								index={0}
							/>
						{/if}
					{:else}
						<p in:fade={{ delay: 200 }}>
							You're all caught up <span
								role="img"
								aria-label="Sunglasses emoji">😎</span
							>
						</p>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
</section>
