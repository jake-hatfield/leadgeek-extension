<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	// components
	import Icon from '@components/utils/Icon.svelte';
	import InfoPanelIssue from '@components/dashboard/InfoPanelIssue.svelte';
	import Loader from '@components/utils/Loader.svelte';

	//  lib
	import { pluralize } from '@lib/stringHelpers';

	//  stores
	import { scannerStatus, scannerIssues } from '@stores/product';
	import { onMount } from 'svelte';

	//  state
	const buttons = [
		{
			title: 'All',
			value: $scannerIssues.length,
			sortKey: '',
		},
		{
			title: 'Urgent',
			value: $scannerIssues.filter((i) => i.sortKey === 'urgent').length,
			sortKey: 'urgent',
		},
	];
	let buttonActive = true;
	let currentSortingHeader = 0;
	let currentSortKey = '';
	let issuesPanelActive = false;

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
		}, 6000);
	});

	$: issues =
		currentSortKey !== ''
			? $scannerIssues.filter((i) => i.sortKey === currentSortKey)
			: $scannerIssues;

	// TODO<Jake>: Loading icon while issue scanner is processing - don't block rendering while analysing a product
	// TODO<Jake>: Style issue items like: https://dribbble.com/shots/15784542-Notification-list-in-side-sheet
	// TODO<Jake>: Create a test list of 5, with grouping and stacking
</script>

<section class="">
	<div class="absolute z-20 bottom-3 left-1/2 transform -translate-x-1/2">
		<!-- button  -->
		{#if buttonActive}
			<div
				in:fade={{ delay: 400 }}
				out:fly={{ y: 15, duration: 200 }}
				class={`w-full rounded-lg whitespace-nowrap shadow transition-main ${
					buttonActive && $scannerIssues.length === 0
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
					{#if $scannerIssues.length !== 0}
						<div>
							<button
								on:click={() => {
									toggleButton();
									toggleIssues();
								}}
								class="p-3"
								data-testId="info-panel-button-active"
							>
								{pluralize($scannerIssues.length, 'issue')}
								{$scannerIssues.length === 1 ? 'requires' : 'require'} your attention
								🔎
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
			class="absolute top-0 z-30 w-full h-full bg-white"
			data-testId="info-panel-details"
		>
			<div class="flex items-end justify-between p-3 border-b border-200">
				<header>
					<h2 class="text-xl font-semibold">Issues</h2>
				</header>
				<button
					on:click={() => {
						toggleIssues();
						toggleButton();
					}}
					class="p-1 rounded-lg bg-gray-100 border border-200 ring-gray transition-main"
					data-testId="info-panel-close-button"
				>
					<Icon type="solid" title="x" />
				</button>
			</div>
			<div
				class="center-between pt-3 px-3 border-b border-200"
				data-testId="info-panel-sorting-headers"
			>
				<ul aria-label="sorting-headers" class="flex items-center">
					{#each buttons as button, i}
						<li class="first:ml-0 ml-8">
							<button
								on:click={() => {
									currentSortingHeader = i;
									currentSortKey = button.sortKey;
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
									{button.title}
								</h3>
								<span
									class={`all-center h-5 w-5 ml-2.5 p-0.5 rounded-md  shadow-sm font-semibold text-xs ${
										currentSortingHeader === i
											? 'bg-gray-900 dark:bg-darkGray-200 text-white'
											: 'bg-gray-200 group-hover:bg-gray-900 dark:bg-darkGray-200 group-hover:shadow text-gray-400 group-hover:text-white'
									}`}
									>{button.value}
								</span>
							</button>
						</li>
					{/each}
				</ul>
				<button
					on:click={() => {
						scannerIssues.set([]);
						toggleIssues();
					}}
					class="mb-2 font-semibold text-gray-600 hover:text-purple-500 outline-none transition-main"
					data-testId="info-panel-button-clear-all"
				>
					Clear all
				</button>
			</div>
			<div class="h-full p-3">
				<ul>
					{#each issues as issue, i (i)}
						<InfoPanelIssue {issue} />
					{:else}
						<div>No data to display</div>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
</section>

<style>
	section {
		max-width: 400px;
	}
</style>
