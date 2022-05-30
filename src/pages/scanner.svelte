<script lang="ts">
	// packages
	import { Link } from 'svelte-navigator';

	// components
	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import Icon from '@components/utils/Icon.svelte';
	import HighlightableText from '@components/utils/HighlightableText.svelte';

	// utils
	import { kebabCase } from '@lib/stringHelpers';
	import { keyboardShortcut } from '@lib/clickHelpers';
	import type IconTitles from '$types/Icon';

	// state
	let searchInput = '';
	let searchInputRef;

	interface Subfeature {
		title: string;
	}

	interface Feature {
		title: string;
		icon: IconTitles;
		children: Subfeature[];
	}

	interface Category {
		title: string;
		children: Feature[];
	}

	const categories: Category[] = [
		{
			title: 'Availability',
			children: [
				{
					title: 'Offers',
					icon: 'user-group',
					children: [
						{
							title: 'Amazon fulfillment offers',
						},
						{ title: 'Merchant fulfillment offers' },
						{
							title: 'Total offer count',
						},
					],
				},
			],
		},
		{
			title: 'Information',
			children: [
				{
					title: 'Classification',
					icon: 'clipboard-list',
					children: [
						{
							title: 'Applicable categories',
						},
						{
							title: 'Parent category',
						},
					],
				},
				{
					title: 'Identifying codes',
					icon: 'qrcode',
					children: [
						{ title: 'ASIN' },
						{
							title: 'European Article Number(s)',
						},
						{
							title: 'Model number(s)',
						},
						{ title: 'Parent ASIN' },
						{
							title: 'Universal Product Code(s)',
						},
						{ title: 'Variation ASIN' },
					],
				},
				{
					title: 'Listing history',
					icon: 'calendar',
					children: [
						{
							title: 'Date created',
						},
						{
							title: 'Date first tracked',
						},
						{
							title: 'Last updated',
						},
					],
				},
				{
					title: 'Production',
					icon: 'globe-alt',
					children: [
						{ title: 'Manufacturer' },
						{ title: 'Brand' },
						{ title: 'Author' },
						{
							title: 'Binding',
						},
					],
				},
				{
					title: 'Shipping details',
					icon: 'cube',
					children: [
						{
							title: 'Package dimensions',
						},
						{
							title: 'Package weight',
						},
						{
							title: 'Item dimensions',
						},
						{
							title: 'Item weight',
						},
					],
				},
			],
		},
		{
			title: 'Metrics',
			children: [
				{
					title: 'Sales rank',
					icon: 'trending-up',
					children: [
						{ title: '30 day average' },
						{ title: '90 day average' },
						{ title: '180 day average' },
						{ title: '30 day estimated drops' },
						{ title: '90 day estimated drops' },
						{ title: '180 day estimated  drops' },
						{
							title: 'Last updated',
						},
						{ title: 'Reference category' },
					],
				},
				{
					title: 'Buy box status',
					icon: 'cash',
					children: [
						{ title: 'Amazon' },
						{
							title: 'Backorder',
						},
						{
							title: 'Preorder',
						},
						{ title: 'Fulfillment by Amazon' },
						{
							title: 'Suppressed',
						},
					],
				},
				{
					title: 'Buy box information',
					icon: 'information-circle',
					children: [
						{ title: 'Current price' },
						{
							title: 'Maximum order quantity',
						},
						{
							title: 'Minimum order quantity',
						},
					],
				},
				{
					title: 'Out of stock percentage',
					icon: 'ban',
					children: [
						{
							title: '30 day average',
						},
						{
							title: '90 day average',
						},
					],
				},
			],
		},
		{
			title: 'Pricing',
			children: [
				{
					title: 'Validation',
					icon: 'badge-check',
					children: [{ title: 'Minimum advertised price' }],
				},
				{
					title: 'History',
					icon: 'clock',
					children: [
						{ title: 'Buy Box price' },
						{ title: 'Maximum price' },
						{ title: 'Minimum price' },
					],
				},
				{
					title: 'Selling costs',
					icon: 'currency-dollar',
					children: [{ title: 'Fulfillment by Amazon fees' }],
				},
			],
		},
	];

	// const searchNestedArray = (categories: Category[], query: string) => {
	// 	// instantiate an empty array to store the matching items
	// 	let result: Category[] = [];

	// 	// ensure that items show without an input
	// 	if (!query) return categories;

	// 	// validate string matches
	// 	const isMatch = (str: string, query: string) => {
	// 		if (str.toLowerCase().includes(query)) return true;
	// 		else return false;
	// 	};

	// 	// iterate over each category
	// 	for (const category of categories) {
	// 		console.log(category);
	// 		// if the category title matches, return the category title + all features + subfeatures of the category
	// 		if (isMatch(category.title, query))
	// 			return (result = [...result, category]);

	// 		// let features: Feature[] = [];

	// 		// iterate over each feature
	// 		// for (const feature of category.children) {
	// 		// 	// if the feature title matches, return the category title, the feature title, and all subfeatures
	// 		// 	if (isMatch(feature.title, query)) {
	// 		// 		features = [...features, feature];
	// 		// 		return (result = [...result, { ...category, children: features }]);
	// 		// 	}

	// 		// 	let subfeatures: Subfeature[] = [];

	// 		// 	// iterate over each subfeature
	// 		// 	for (const subfeature of feature.children) {
	// 		// 		// if the subfeature title matches, add it to the subfeatures array
	// 		// 		if (isMatch(subfeature.title, query)) {
	// 		// 			subfeatures = [...subfeatures, subfeature];
	// 		// 		}
	// 		// 	}

	// 		// 	features = [...features, { ...feature, children: subfeatures }];
	// 		// }

	// 		// return (result = [
	// 		// 	...result,
	// 		// 	{
	// 		// 		...category,
	// 		// 		children: features,
	// 		// 	},
	// 		// ]);
	// 		return result;
	// 	}

	// 	// return (result = []);
	// };

	const highlightChunkedText = (text: string, query: string) => {
		const chunks = highlightWords({ text, query });
	};

	const searchNestedArray = (categories: Category[], query: string) => {
		// ensure that items show without an input
		if (!query) return categories;

		// instantiate an empty array to store the matching items
		let result: Category[] = [];

		// validate string matches
		const isMatch = (str: string, query: string) => {
			if (str.toLowerCase().includes(query)) return true;
			else return false;
		};

		// iterate over each category
		for (const category of categories) {
			// instantiate empty arrays to store the matching items
			let features: Feature[] = [];
			let subfeatures: Subfeature[] = [];

			// if the category title matches, return the category title + all features + subfeatures of the category
			if (isMatch(category.title, query))
				return (result = [...result, category]);
			else {
				// iterate over each feature
				for (const feature of category.children) {
					// if the feature title matches, return the category title, the feature title, and all subfeatures
					if (isMatch(feature.title, query)) {
						features = [...features, feature];
						return (result = [...result, { ...category, children: features }]);
					} else {
						// iterate over each subfeature
						for (const subfeature of feature.children) {
							// if the subfeature title matches, add it to the subfeatures array
							if (isMatch(subfeature.title, query)) {
								subfeatures = [...subfeatures, subfeature];
								features = [{ ...feature, children: subfeatures }];
							}
						}
					}
				}
				// if the category has matching features, add them to the result
				if (features.length > 0) {
					result = [
						...result,
						{
							...category,
							children: features,
						},
					];
				}
			}
		}

		return result;
	};

	$: filteredCategories = searchNestedArray(
		categories,
		searchInput.toLowerCase()
	);

	// const highlight = (str: string, query) => {

	// }

	// https://dribbble.com/shots/15388627-Global-Search
	// TODO<Jake>: On add, ask which widget to add it to
	// TODO<Jake>: OS detection for ctrl or cmd keyboard shortcut prompt
	// TODO<Jake>: Animate list changing
</script>

<AuthLayout>
	<section>
		<header class="p-3 border-b border-200">
			<div class="relative">
				<Icon type="outline" title="search" class="absolute left-3 top-2.5" />
				<input
					type="text"
					bind:value={searchInput}
					bind:this={searchInputRef}
					placeholder="Search for a feature..."
					class="w-full py-1.5 pl-10 pr-12 border border-200 rounded-lg ring ring-transparent hover:ring-gray-400 outline-none"
				/>
				<div class="absolute right-3 top-2.5">
					<span
						class="all-center h-5 w-min-content py-0.5 px-1 rounded-md bg-gray-200 dark:bg-darkGray-200 shadow-sm group-hover:shadow font-semibold text-sm text-100"
					>
						{#if searchInput}
							<button
								use:keyboardShortcut={{ code: 'Escape' }}
								on:click={() => (searchInput = '')}
								class="font-semibold">Esc</button
							>
						{:else}
							<button
								use:keyboardShortcut={{ control: true, code: 'KeyK' }}
								on:click|preventDefault={() => searchInputRef.focus()}
								class="font-semibold"
							>
								Ctrl + k
							</button>
						{/if}
					</span>
				</div>
			</div>
		</header>
		<div class="h-[421px] pt-5 pb-3 pl-3 pr-5 minimal-scrollbar">
			{#if filteredCategories.length > 0}
				<ul>
					{#each filteredCategories as category}
						<li class="first:mt-0 mt-5">
							<ul>
								<li
									class="uppercase font-semibold text-sm tracking-widest text-gray-500"
								>
									<h2 aria-label={category.title}>
										<HighlightableText
											text={category.title}
											query={searchInput}
										/>
									</h2>
								</li>
								{#each category.children as subcategory}
									<li class="mt-3">
										<ul>
											<li class="rounded-lg hover:bg-gray-100">
												<Link
													to={`/scanner/${kebabCase(subcategory.title)}`}
													class="center-between p-3"
												>
													<header class="flex items-center">
														<!-- A stale icon is shown if key block is left out -->
														{#key filteredCategories}
															<Icon type="solid" title={subcategory.icon} />
														{/key}
														<h3 class="ml-3">
															<HighlightableText
																text={subcategory.title}
																query={searchInput}
															/>
														</h3>
													</header>
													<Icon
														type="solid"
														title="chevron-right"
														class="!text-gray-300"
													/>
												</Link>
											</li>
											<li class="mt-1.5 ml-1.5">
												<ul class="border-l border-200">
													{#each subcategory.children as feature}
														<li
															class="mt-1.5 ml-1.5 rounded-lg hover:bg-gray-100"
														>
															<Link
																to={`/scanner/${kebabCase(
																	subcategory.title
																)}#${kebabCase(feature.title)}`}
																class="center-between p-3"
															>
																<header class="flex items-center">
																	<Icon
																		type="solid"
																		title="hashtag"
																		class="!text-gray-300"
																	/>
																	<h4 class="ml-3">
																		<HighlightableText
																			text={feature.title}
																			query={searchInput}
																		/>
																	</h4>
																</header>
																<Icon
																	type="solid"
																	title="chevron-right"
																	class="!text-gray-300"
																/>
															</Link>
														</li>
													{/each}
												</ul>
											</li>
										</ul>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			{:else}
				<div>
					<header class="text-center">
						<h2>No results for "{searchInput}"</h2>
					</header>
					<p class="mt-5">Try searching for:</p>
					<ul class="mt-3">
						<li>Accessibility</li>
					</ul>
				</div>
			{/if}
		</div>
	</section>
</AuthLayout>
