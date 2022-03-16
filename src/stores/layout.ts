import { get, writable, Writable } from 'svelte/store';

// packages
import { v4 as uuidv4 } from 'uuid';

// types
import type LayoutItem from '$types/LayoutItem';

const createLayout = () => {
	const { subscribe, set, update } = writable<LayoutItem[]>([
		{
			id: '1',
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
			id: '1',
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

	const status: Writable<'idle' | 'loading' | 'error'> = writable('idle');

	const currentDashboard = writable(
		typeof layout[0] !== 'undefined' ? layout[0].dashboard : null
	);

	const createDashboard = (title: string) => {
		update((layout: LayoutItem[]) => [
			...layout,
			{
				id: uuidv4(),
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
		update((layout: LayoutItem[]) =>
			layout.filter((l) => l.dashboard.id !== id)
		);
	};

	const getLayoutItemById = (id?: string): LayoutItem => {
		const currentLayouts: LayoutItem[] = get(layout);

		const currentLayout = currentLayouts.find((l) => l.dashboard.id === id);

		if (currentLayout) return currentLayout;

		return currentLayout[0];
	};

	const getLayoutItemIndexById = (id: string) => {
		// get the current store layout
		const currentLayout: LayoutItem[] = get(layout);

		// if there are no layout items in the array, return
		if (currentLayout.length === 0) return -1;

		// return the index of the current id
		return currentLayout.findIndex((l) => l.dashboard.id === id);
	};

	const checkNextLayoutItem = (index: number, val: -1 | 1) => {
		// if the index is negative or if the item is the first index in the array and we're trying to decrement, there's no dashboard next to it
		if (index === -1 || (index === 0 && val === -1)) return false;

		// get the current store layout
		const currentLayout: LayoutItem[] = get(layout);

		// if there's no index that exists in the array, return that there is not a next item in the array
		if (typeof currentLayout[index + val] === 'undefined') return false;

		// return that there is a next item in the array
		return true;
	};

	const hasNextLayoutItem = (id: string) => {
		return checkNextLayoutItem(getLayoutItemIndexById(id), 1);
	};

	const hasPreviousLayoutItem = (id: string) => {
		return checkNextLayoutItem(getLayoutItemIndexById(id), -1);
	};

	const getNextLayoutItem = (id: string, val: -1 | 1) => {
		// get the current store layout
		const currentLayout: LayoutItem[] = get(layout);

		// if there are no layout items in the array, return
		if (currentLayout.length === 0) return '';

		// get the index of the current layout item in the store
		const currentIndex = getLayoutItemIndexById(id);

		// if the index isn't found, return
		if (currentIndex < 0) return '';

		// validate that there's a next dashboard at all
		if (!checkNextLayoutItem(currentIndex, val)) return '';

		// return the id of the next dashboard
		return currentLayout[currentIndex + val].dashboard.id;
	};

	const updateCurrentDashboard = (id: string) => {
		update((currentDashboard, layout) => {
			currentDashboard = layout.filter((l) => l.dashboard.id === id)[0];
		});
	};

	const createWidget = () => {};

	const deleteWidget = () => {};

	return {
		createDashboard,
		createWidget,
		deleteWidget,
		deleteDashboard,
		get,
		getLayoutItemById,
		getNextLayoutItem,
		hasNextLayoutItem,
		hasPreviousLayoutItem,
		set,
		status,
		subscribe,
		updateCurrentDashboard,
	};
};

export const layout = createLayout();
