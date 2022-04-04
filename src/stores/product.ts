import { Writable, writable } from 'svelte/store';

// packages
import { v4 as uuidv4 } from 'uuid';

// types
import type Issue from '$types/Issue';
import type KeepaProduct from '$types/KeepaProduct';

export const status: Writable<'loading' | 'idle' | 'error'> =
	writable('loading');

export const data: Writable<KeepaProduct | {}> = writable({});

export const scannerStatus: Writable<'loading' | 'idle' | 'error'> =
	writable('loading');

const createScannerIssues = () => {
	const { subscribe, set, update } = writable<Issue[]>([
		{
			id: 'test-issue-id-1',
			category: 'Buy box',
			description: 'Test issue description 1',
			priority: 1,
			sortKey: 'none',
			title: 'Test issue title 1',
		},
		{
			id: 'test-issue-id-2',
			category: 'Selling restrictions',
			description: 'Test issue description 2',
			priority: 2,
			sortKey: 'urgent',
			title: 'Test issue title 2',
		},
		{
			id: 'test-issue-id-3',
			category: 'Profitability',
			description: 'Test issue description 3',
			priority: 3,
			sortKey: 'none',
			title: 'Test issue title 3',
		},
	]);

	const deleteIssue = (id: string) => {
		update((scannerIssues: Issue[]) =>
			scannerIssues.filter((i) => i.id !== id)
		);
	};

	return {
		deleteIssue,
		set,
		subscribe,
	};
};

export const scannerIssues = createScannerIssues();
