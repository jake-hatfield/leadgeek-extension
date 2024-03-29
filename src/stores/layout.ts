import { get, writable } from 'svelte/store';

// packages
import { v4 as uuidv4 } from 'uuid';

// types
import type Dashboard from '$types/Dashboard';

const createLayout = () => {
	const { subscribe, set, update } = writable<Dashboard[]>([]);

	const createDashboard = (title: string) => {
		const newDashboard = {
			id: uuidv4(),
			default: false,
			title,
			color: 'bg-purple-500',
			widgets: [],
		};
		currentDashboard.set(newDashboard);
		update((layout: Dashboard[]) => [...layout, newDashboard]);
	};

	const deleteDashboard = (id: string) => {
		update((layout: Dashboard[]) => layout.filter((l) => l.id !== id));
	};

	const defaultDashboard = () => {
		// get the current store layout
		const dashboards: Dashboard[] = get(layout);

		// if there are layout items in the array, return the default one, otherwise return null
		return dashboards.length > 0
			? dashboards.find((d) => d.default === true)
				? dashboards.find((d) => d.default === true)
				: dashboards[0]
			: null;
	};

	const editDashboardTitle = (id: string, title: string) => {
		const dashboard = getDashboardById(id);

		if (dashboard) {
			dashboard.title = title;
		}
	};

	const getDashboardById = (id: string): Dashboard => {
		// get the current store layout
		const dashboards: Dashboard[] = get(layout);

		// if there are no layout items in the array, return null
		if (dashboards.length === 0) return null;

		// lookup the current dashboard
		const dashboard = dashboards.find((d) => d.id === id);

		// if it exists, return it
		if (dashboard) return dashboard;

		// dashboard not found, return null
		return null;
	};

	const getDashboardIndexById = (id: string) => {
		// get the current store layout
		const dashboards: Dashboard[] = get(layout);

		// if there are no layout items in the array, return
		if (dashboards.length === 0) return -1;

		// return the index of the current id
		return dashboards.findIndex((d) => d.id === id);
	};

	const checkNextDashboard = (index: number, val: -1 | 1) => {
		// if the index is negative or if the item is the first index in the array and we're trying to decrement, there's no dashboard next to it
		if (index === -1 || (index === 0 && val === -1)) return false;

		// get the current store layout
		const dashboards: Dashboard[] = get(layout);

		// if there's no index that exists in the array, return that there is not a next item in the array
		if (typeof dashboards[index + val] === 'undefined') return false;

		// return that there is a next item in the array
		return true;
	};

	const getNextDashboardId = (id: string, val: -1 | 1) => {
		// get the current store layout
		const dashboards: Dashboard[] = get(layout);

		// if there are no layout items in the array, return
		if (dashboards.length === 0) return '';

		// get the index of the current layout item in the store
		const currentIndex = getDashboardIndexById(id);

		// if the index isn't found, return
		if (currentIndex < 0) return '';

		// validate that there's a next dashboard at all
		if (!checkNextDashboard(currentIndex, val)) return '';

		// return the id of the next dashboard
		return dashboards[currentIndex + val].id;
	};

	const createWidget = () => {};

	const deleteWidget = () => {};

	return {
		createDashboard,
		createWidget,
		defaultDashboard,
		deleteDashboard,
		deleteWidget,
		editDashboardTitle,
		get,
		getDashboardById,
		getNextDashboardId,
		set,
		subscribe,
	};
};

export const layout = createLayout();

export const currentDashboard = writable<Dashboard | null>(
	layout.defaultDashboard()
);
