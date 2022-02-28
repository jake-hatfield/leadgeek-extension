import { writable } from 'svelte/store';

export const dashboards = writable([
	{
		dashboard: {
			id: '123',
		},
		widgets: [
			{
				title: 'Profit analysis',
				data: [
					{ title: 'Est.sales/mo', value: 1500000 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 1500000 },
				],
			},
			{
				title: 'Sales/mo',
				data: [
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
				],
			},
			{
				title: 'Competition',
				data: [
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
				],
			},
			{
				title: 'Variations',
				data: [
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
				],
			},
		],
	},
]);
