<script lang="ts">
	//  stores
	import { alert } from '@stores/alert';
	import { data } from '@stores/product';

	//  utils
	import { handleClickOutside } from '@lib/clickHelpers';

	//  props
	export let issues = ['ree'];

	//  state
	let issuesPanelActive = false;

	//  functions
	const toggleIssues = () => {
		issuesPanelActive = !issuesPanelActive;
	};
</script>

<section
	use:handleClickOutside={{
		enabled: issuesPanelActive,
		cb: () => issuesPanelActive && toggleIssues(),
	}}
	class={issuesPanelActive
		? 'absolute bottom-0 z-20 w-full h-full bg-white'
		: ''}
>
	<header
		class={`flex items-end justify-between w-full py-5 px-3 border-t font-semibold ${
			issues.length === 0
				? 'bg-teal-200 border-teal-500 text-teal-900'
				: 'bg-red-100 border-red-300 text-red-800'
		}`}
	>
		<h3>
			{issues.length} potential {issues.length === 1 ? 'issue' : 'issues'}
		</h3>
		{#if issues.length !== 0}
			<button
				on:click={() =>
					alert.create({
						type: 'danger',
						title: 'hello',
						description: 'RE',
					})}
				class="py-1.5 px-3 rounded-lg bg-red-300 hover:bg-red-400 border border-red-400 hover:border-red-500 text-sm text-red-900 font-semibold ring-red transition-main"
			>
				{#if issuesPanelActive}
					Hide details
				{:else}
					View details
				{/if}
			</button>
		{/if}
	</header>

	<!-- issues panel -->
	{#if issuesPanelActive}
		<ul class="py-5">
			{#each issues as issue}
				<li class="px-3">{issue}</li>
			{/each}
		</ul>
		<div>{$data}</div>
	{/if}
</section>

<style>
	section {
		max-width: 400px;
	}
</style>
