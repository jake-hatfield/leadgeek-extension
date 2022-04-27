<script lang="ts">
	// components
	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import ButtonIcon from '@components/utils/ButtonIcon.svelte';
	import Icon from '@components/utils/Icon.svelte';

	// state
	let currentFeatureCategory = 0;
	let searchInput = '';
	const featureCategories = [
		{
			title: 'All',
			value: 87,
		},
		{
			title: 'Pricing',
			value: 20,
		},
		{
			title: 'Metrics',
			value: 23,
		},
		{
			title: 'Misc.',
			value: 44,
		},
	];

	// https://dribbble.com/shots/15388627-Global-Search
</script>

<AuthLayout>
	<section>
		<header class="p-3 border-b border-200">
			<div class="relative">
				<Icon type="outline" title="search" class="absolute left-3 top-2.5" />
				<input
					type="text"
					bind:value={searchInput}
					placeholder="Search for a feature..."
					class="w-full py-1.5 pl-10 pr-12 border border-200 rounded-lg ring ring-transparent hover:ring-gray-400 outline-none"
				/>
				<div class="absolute right-3 top-2.5">
					<span
						class="all-center h-5 w-min-content py-0.5 px-1 rounded-md bg-gray-200 dark:bg-darkGray-200 shadow-sm group-hover:shadow font-semibold text-sm text-100"
					>
						{#if searchInput}
							Esc
						{:else}
							Ctrl+k
						{/if}
					</span>
				</div>
			</div>
		</header>
		<div
			class="center-between pt-3 px-3 border-b border-200"
			data-testId="info-panel-sorting-headers"
		>
			<ul aria-label="sorting-headers" class="flex items-center">
				{#each featureCategories as featureCategory, i}
					<li class="first:ml-0 ml-3">
						<button
							on:click={() => {}}
							class={`flex items-end -mb-px pb-3 px-1.5 font-semibold group border-b-2 outline-none ${
								currentFeatureCategory === i
									? 'border-purple-500'
									: 'border-transparent hover:border-purple-500 transition-main'
							}`}
						>
							<h3
								class={`leading-4 ${
									currentFeatureCategory === i
										? 'text-gray-900'
										: 'text-gray-400 group-hover:text-gray-900'
								}`}
							>
								{featureCategory.title}
							</h3>
							<span
								class={`all-center h-5 w-5 ml-2.5 p-0.5 rounded-md  shadow-sm font-semibold text-xs ${
									currentFeatureCategory === i
										? 'bg-gray-900 dark:bg-darkGray-200 text-white'
										: 'bg-gray-200 group-hover:bg-gray-900 dark:bg-darkGray-200 group-hover:shadow text-gray-400 group-hover:text-white'
								}`}
								>{featureCategory.value}
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</AuthLayout>
