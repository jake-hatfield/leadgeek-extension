import { Writable, writable } from 'svelte/store';

// types
import type KeepaProduct from '$types/KeepaProduct';

export const status: Writable<'loading' | 'idle' | 'error'> =
	writable('loading');

export const data: Writable<KeepaProduct | {}> = writable({});

export const scannerStatus: Writable<'loading' | 'idle' | 'error'> =
	writable('loading');

export const scannerIssues = writable([
	{
		title: 'Some issue',
		sortKey: 'urgent',
	},
	{
		title: 'Another issue',
		sortKey: 'none',
	},
	{
		title: 'Some issue',
		sortKey: 'urgent',
	},
]);
