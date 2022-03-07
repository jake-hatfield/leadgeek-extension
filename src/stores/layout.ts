import { writable, Writable } from 'svelte/store';

// types
import type Dashboard from '$types/Dashboard';
import type Widget from '$types/Widget';

export const layout: Writable<
	{
		dashboard: Dashboard;
		widgets: Widget[];
	}[]
> = writable([
	{
		dashboard: {
			dId: '1',
			title: 'Dashboard 1',
		},
		widgets: [
			{
				wId: '123',
				title: 'Profit analysis',
				data: [
					{ title: 'Est.sales/mo', value: 1500000 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 1500000 },
				],
			},
			{
				wId: '1234',
				title: 'Sales/mo',
				data: [
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
				],
			},
			{
				wId: '1263',
				title: 'Competition',
				data: [
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
				],
			},
			{
				wId: '12333',
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
