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
});
