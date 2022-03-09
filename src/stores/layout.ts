import { writable, Writable } from 'svelte/store';

// packages

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
			id: '1',
			title: 'Dashboard 1',
			color: 'bg-teal-500',
		},
		widgets: [
			{
				id: '123',
				title: 'Profit analysis',
				data: [
					{ title: 'Est.sales/mo', value: 1500000 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 1500000 },
				],
			},
			{
				id: '1234',
				title: 'Sales/mo',
				data: [
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
				],
			},
			{
				id: '1263',
				title: 'Competition',
				data: [
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
					{ title: 'Est.sales/mo', value: 79 },
				],
			},
			{
				id: '12333',
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
