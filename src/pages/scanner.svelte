<script lang="ts">
	// packages
	import { Link } from 'svelte-navigator';

	// components
	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import Icon from '@components/utils/Icon.svelte';

	// utils
	import { kebabCase } from '@lib/stringHelpers';

	// state
	let searchInput = '';

	const categories = [
		// {
		// 	title: 'All',
		// 	children: [],
		// },
		// {
		// 	title: 'Avail.',
		// 	children: [{}],
		// },
		{
			title: 'Availability',
			children: [
				{
					title: 'Offers',
					icon: 'user-group',
					children: [
						{
							title: 'Amazon fulfillment offers',
							active: true,
						},
						{ title: 'Merchant fulfillment offers', active: false },
						{
							title: 'Total offer count',
							active: true,
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
							active: true,
						},
						{
							title: 'Parent category',
							active: true,
						},
					],
				},
				{
					title: 'Identifying codes',
					icon: 'qrcode',
					children: [
						{ title: 'ASIN', active: true },
						{
							title: 'European Article Number(s)',
							active: false,
						},
						{
							title: 'Model number(s)',
							active: true,
						},
						{ title: 'Parent ASIN', active: false },
						{
							title: 'Universal Product Code(s)',
							active: true,
						},
						{ title: 'Variation ASIN', active: true },
					],
				},
				{
					title: 'Listing history',
					icon: 'calendar',
					children: [
						{
							title: 'Date created',
							active: false,
						},
						{
							title: 'Date first tracked',
							active: true,
						},
						{
							title: 'Last updated',
							active: true,
						},
					],
				},
				{
					title: 'Production',
					icon: 'globe-alt',
					children: [
						{ title: 'Manufacturer', active: false },
						{ title: 'Brand', active: true },
						{ title: 'Author', active: true },
						{
							title: 'Binding',
							active: true,
						},
					],
				},
				{
					title: 'Shipping details',
					icon: 'cube',
					children: [
						{
							title: 'Package dimensions',
							active: true,
						},
						{
							title: 'Package weight',
							active: true,
						},
						{
							title: 'Item dimensions',
							active: true,
						},
						{
							title: 'Item weight',
							active: true,
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
						{ title: '30 day average', active: true },
						{ title: '90 day average', active: true },
						{ title: '180 day average', active: true },
						{ title: '30 day estimated drops', active: false },
						{ title: '90 day estimated drops', active: false },
						{ title: '180 dayestimated  drops', active: false },
						{
							title: 'Last updated',
							active: false,
						},
						{ title: 'Reference category', active: false },
					],
				},
				{
					title: 'Buy box status',
					icon: 'cash',
					children: [
						{ title: 'Amazon', active: true },
						{
							title: 'Backorder',
							active: false,
						},
						{
							title: 'Preorder',
							active: false,
						},
						{ title: 'Fulfillment by Amazon', active: true },
						{
							title: 'Suppressed',
							active: false,
						},
					],
				},
				{
					title: 'Buy box information',
					icon: 'information-circle',
					children: [
						{ title: 'Current price', active: true },
						{
							title: 'Maximum order quantity',
							active: false,
						},
						{
							title: 'Minimum order quantity',
							active: false,
						},
					],
				},
				{
					title: 'Out of stock percentage',
					icon: 'ban',
					children: [
						{
							title: '30 day average',
							active: false,
						},
						{
							title: '90 day average',
							active: false,
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
					children: [{ title: 'Minimum advertised price', active: false }],
				},
				{
					title: 'History',
					icon: 'clock',
					children: [
						{ title: 'Buy Box price', active: false },
						{ title: 'Maximum price', active: false },
						{ title: 'Minimum price', active: true },
					],
				},
				{
					title: 'Selling costs',
					icon: 'currency-dollar',
					children: [{ title: 'Fulfillment by Amazon fees', active: false }],
				},
			],
		},
	];

	$: filteredFeatures = categories;

	// https://dribbble.com/shots/15388627-Global-Search
	// TODO<Jake>: On add, ask which widget to add it to
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
							<button class="font-semibold"> Esc </button>
						{:else}
							Ctrl+K
						{/if}
					</span>
				</div>
			</div>
		</header>

		<div class="h-[421px] pt-5 pb-3 pl-3 pr-5 minimal-scrollbar">
			<ul>
				{#each filteredFeatures as category}
					<li class="first:mt-0 mt-5">
						<ul>
							<li
								class="uppercase font-semibold text-sm tracking-widest text-gray-500"
							>
								<h2>
									{category.title}
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
													<Icon type="solid" title={subcategory.icon} />
													<h3 class="ml-3">
														{subcategory.title}
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
															class="center-between py-2 pl-3 pr-1.5"
														>
															<header class="flex items-center">
																<Icon
																	type="solid"
																	title="hashtag"
																	class="!text-gray-300"
																/>
																<h4 class="ml-3">
																	{feature.title}
																</h4>
															</header>
															<button
																class="p-1.5 rounded-lg hover:bg-gray-900"
															>
																<Icon
																	type="solid"
																	title={feature.active
																		? 'minus-sm'
																		: 'plus-sm'}
																	class="!text-gray-300"
																/>
															</button>
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
		</div>
	</section>
</AuthLayout>
