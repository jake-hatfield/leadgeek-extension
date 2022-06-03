import '@testing-library/jest-dom';

// store
import { layout } from '@stores/layout';

describe('empty layout state', () => {
	beforeEach(() => {
		layout.set([]);
	});

	test('layout.defaultDashboard() should return null', () => {
		expect(layout.defaultDashboard()).toBe(null);
	});

	test('layout.getDashboardById() should return null', () => {
		expect(layout.getDashboardById('fake-id')).toBe(null);
	});

	test('layout.getNextDashboard() should return empty string', () => {
		expect(layout.getNextDashboardId('fake-id', 1)).toBe('');
	});
});

describe('populated state layout', () => {
	beforeEach(() => {
		layout.set([
			{
				id: '123456',
				default: true,
				title: 'Test dashboard #1',
				color: 'bg-teal-500',
				widgets: [
					{
						id: '1',
						title: 'Profit analysis',
						data: [
							{ title: 'Est.sales/mo', value: 1500000 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 1500000 },
						],
					},
					{
						id: '12',
						title: 'Sales/mo',
						data: [
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
						],
					},
					{
						id: '123',
						title: 'Competition',
						data: [
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
						],
					},
					{
						id: '1234',
						title: 'Variations',
						data: [
							{ title: 'Est.sales/mo', value: 80 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
						],
					},
				],
			},
			{
				id: '654321',
				default: false,
				title: 'Test dashboard #2',
				color: 'bg-purple-500',
				widgets: [
					{
						id: '1',
						title: 'Profit analysis',
						data: [
							{ title: 'Est.sales/mo', value: 1500000 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 1500000 },
						],
					},
					{
						id: '21',
						title: 'Sales/mo',
						data: [
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
						],
					},
					{
						id: '321',
						title: 'Competition',
						data: [
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
						],
					},
					{
						id: '4321',
						title: 'Variations',
						data: [
							{ title: 'Est.sales/mo', value: 80 },
							{ title: 'Est.sales/mo', value: 79 },
							{ title: 'Est.sales/mo', value: 79 },
						],
					},
				],
			},
		]);
	});

	test("layout.defaultDashboardId() should return first dashboard's id", () => {
		expect(layout.defaultDashboard()).toStrictEqual({
			id: '123456',
			default: true,
			title: 'Test dashboard #1',
			color: 'bg-teal-500',
			widgets: [
				{
					id: '1',
					title: 'Profit analysis',
					data: [
						{ title: 'Est.sales/mo', value: 1500000 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 1500000 },
					],
				},
				{
					id: '12',
					title: 'Sales/mo',
					data: [
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
				{
					id: '123',
					title: 'Competition',
					data: [
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
				{
					id: '1234',
					title: 'Variations',
					data: [
						{ title: 'Est.sales/mo', value: 80 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
			],
		});
	});

	test('layout.getDashboardById() should return appropriate dashboard', () => {
		expect(layout.getDashboardById('123456')).toEqual({
			id: '123456',
			default: true,
			title: 'Test dashboard #1',
			color: 'bg-teal-500',
			widgets: [
				{
					id: '1',
					title: 'Profit analysis',
					data: [
						{ title: 'Est.sales/mo', value: 1500000 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 1500000 },
					],
				},
				{
					id: '12',
					title: 'Sales/mo',
					data: [
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
				{
					id: '123',
					title: 'Competition',
					data: [
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
				{
					id: '1234',
					title: 'Variations',
					data: [
						{ title: 'Est.sales/mo', value: 80 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
			],
		});
	});

	test('layout.getDashboardById() should return null if no dashboard found', () => {
		expect(layout.getDashboardById('fake-id')).toBe(null);
	});

	test('layout.getNextDashboardId() should return the id of the next dashboard in the array', () => {
		expect(layout.getNextDashboardId('123456', 1)).toBe('654321');
	});

	test('layout.getNextDashboardId() should return empty string if no dashboard found', () => {
		expect(layout.getNextDashboardId('fake-id', 1)).toBe('');
	});

	test('layout.getNextDashboardId() should return empty string if 0 index item tries to get the -1 index', () => {
		expect(layout.getNextDashboardId('123456', -1)).toBe('');
	});
});
