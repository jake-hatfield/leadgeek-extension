import { get, writable, Writable } from 'svelte/store';

// packages
import { v4 as uuidv4 } from 'uuid';

// types
import type Dashboard from '$types/Dashboard';
import type Widget from '$types/Widget';

const createLayout = () => {
	const { subscribe, set, update } = writable<
		{ dashboard: Dashboard; widgets: Widget[] }[]
	>([
		{
			dashboard: {
				id: '1',
				title: 'Dashboard #1',
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
		{
			dashboard: {
				id: '2',
				title: 'Dashboard #2',
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

	const createDashboard = (title: string) => {
		update((layout) => [
			...layout,
			{
				dashboard: {
					title,
					id: uuidv4(),
					color: 'bg-purple-500',
				},
				widgets: [],
			},
		]);
	};

	const deleteDashboard = (id: string) => {
		update((layout) => layout.filter((l) => l.dashboard.id !== id));
	};

	const getDashboardIndex = (id: string) => {
		const currentLayout = get(layout);

		return currentLayout.findIndex((l) => l.dashboard.id === id);
	};

	const createWidget = () => {};

	const deleteWidget = () => {};

	return {
		get,
		getDashboardIndex,
		set,
		subscribe,
		createDashboard,
		deleteDashboard,
		createWidget,
		deleteWidget,
	};
};

export const layout = createLayout();
