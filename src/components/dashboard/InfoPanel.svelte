<script lang="ts">
	//  lib
	import { pluralize } from '@lib/stringHelpers';

	//  stores
	import { status } from '@stores/product';

	//  props
	export let issues = [];

	//  state
	let issuesPanelActive = false;

	//  functions
	const toggleIssues = () => {
		issuesPanelActive = !issuesPanelActive;
	};

	// TODO<Jake>: Loading icon while issue scanner is processing - don't block rendering while analysing a product
</script>

<section
	class={`absolute z-20 left-1/2 transform -translate-x-1/2 transition duration-500 ease-in-out ${
		issuesPanelActive ? 'top-0 h-full' : 'bottom-2'
	}`}
>
	<!-- inital  -->
	<div
		class={`relative w-full p-3 rounded-lg whitespace-nowrap shadow ${
			$status !== 'loading' && issues.length === 0
				? 'bg-teal-200 border-teal-500 text-teal-900'
				: 'bg-gray-900 text-white'
		}`}
	>
		{#if $status === 'loading'}
			<div>Loading</div>
		{:else if issues.length > 0}
			<div>
				<button>
					{pluralize(issues.length, 'issue')} requires your attention 🔎
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
			<p>
				No issues found <span role="img" aria-label="Party emoji">🎉</span>
			</p>
		{/if}
	</div>

	<!-- issues panel -->
	{#if issuesPanelActive}
		<ul class="py-5">
			{#each issues as issue}
				<li class="px-3">{issue}</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	section {
		max-width: 400px;
	}
</style>
