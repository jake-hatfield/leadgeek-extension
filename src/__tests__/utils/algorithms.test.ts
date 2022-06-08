import '@testing-library/jest-dom';

// functions
import { searchNestedArray } from '@utils/algorithms';

// types
import type { Category } from '$types/ScannerHelpers';

describe('scanner search algorithm', () => {
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

	test('it should be defined', () => {
		expect(searchNestedArray(categories, '')).toBeDefined();
	});

	test('it should return all categories on empty query', () => {
		expect(searchNestedArray(categories, '')).toEqual(categories);
	});

	test("it should return many matches on generic search 'a'", () => {
		expect(searchNestedArray(categories, 'a')).toStrictEqual([
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
						children: [{ title: 'Maximum price' }],
					},
					{
						title: 'Selling costs',
						icon: 'currency-dollar',
						children: [{ title: 'Fulfillment by Amazon fees' }],
					},
				],
			},
		]);
	});

	test('it should return no items on no match', () => {
		// valid search without a match, e.g. "out of stock percentage" would match, but "out of stock percentages" does not
		expect(searchNestedArray(categories, 'out of stock percentages')).toEqual(
			[]
		);
		// invalid search
		expect(searchNestedArray(categories, '$$$')).toEqual([]);
	});

	test('it should return matching items independent of case', () => {
		expect(searchNestedArray(categories, 'VALIDATION')).toStrictEqual([
			{
				title: 'Pricing',
				children: [
					{
						title: 'Validation',
						icon: 'badge-check',
						children: [{ title: 'Minimum advertised price' }],
					},
				],
			},
		]);
	});

	test('it should return the top-level category, all features, and all subfeatures on full match of category', () => {
		expect(searchNestedArray(categories, 'availability')).toStrictEqual([
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
		]);
	});

	test('it should return the top-level category, matching feature, and all subfeatures on full match of feature', () => {
		expect(
			searchNestedArray(categories, 'out of stock percentage')
		).toStrictEqual([
			{
				title: 'Metrics',
				children: [
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
		]);
	});

	test('it should return the top-level category, the parent feature, and the matching subfeature on full match of subfeature', () => {
		expect(searchNestedArray(categories, 'reference category')).toStrictEqual([
			{
				title: 'Metrics',
				children: [
					{
						title: 'Sales rank',
						icon: 'trending-up',
						children: [{ title: 'Reference category' }],
					},
				],
			},
		]);
	});

	test('it should return all matching categories, features, and subfeatures of a query with more than one possible match', () => {
		expect(searchNestedArray(categories, 'information')).toStrictEqual([
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
				],
			},
		]);
	});

	test('it should return the top-level category, all matching features, and all matching subfeatures of a query with more than one possible match', () => {
		expect(searchNestedArray(categories, '30 day average')).toStrictEqual([
			{
				title: 'Metrics',
				children: [
					{
						title: 'Sales rank',
						icon: 'trending-up',
						children: [{ title: '30 day average' }],
					},
					{
						title: 'Out of stock percentage',
						icon: 'ban',
						children: [
							{
								title: '30 day average',
							},
						],
					},
				],
			},
		]);
	});
});
