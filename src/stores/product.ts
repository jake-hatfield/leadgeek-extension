import { derived, get, Writable, writable } from 'svelte/store';

// packages
import { v4 as uuidv4 } from 'uuid';

// types
import type Issue from '$types/Issue';
import type IssueGroup from '$types/IssueGroup';
import type KeepaProduct from '$types/KeepaProduct';

export const status: Writable<'loading' | 'idle' | 'error'> =
	writable('loading');

export const data: Writable<KeepaProduct | {}> = writable({});

export const scannerStatus: Writable<'loading' | 'idle' | 'error'> =
	writable('loading');

const createscannerIssueGroups = () => {
	const { subscribe, set, update } = writable<
		{ id: string; category: string; children: Issue[] }[]
	>([
		{
			id: 'test-category-id-1',
			category: 'Buy box',
			children: [
				{
					id: 'test-issue-id-1',
					description: 'Test issue description 1',
					priority: 1,
					sortKey: 'none',
					title: 'Test issue title 1',
				},
				{
					id: 'test-issue-id-4',
					description: 'Test issue description 4',
					priority: 2,
					sortKey: 'none',
					title: 'Test issue title 4',
				},
				{
					id: 'test-issue-id-5',
					description: 'Test issue description 5',
					priority: 4,
					sortKey: 'none',
					title: 'Test issue title 5',
				},
				{
					id: 'test-issue-id-5',
					description: 'Test issue description 5',
					priority: 5,
					sortKey: 'none',
					title: 'Test issue title 5',
				},
				{
					id: 'test-issue-id-5',
					description: 'Test issue description 5',
					priority: 6,
					sortKey: 'none',
					title: 'Test issue title 5',
				},
				{
					id: 'test-issue-id-5',
					description: 'Test issue description 5',
					priority: 7,
					sortKey: 'none',
					title: 'Test issue title 5',
				},
				{
					id: 'test-issue-id-5',
					description: 'Test issue description 5',
					priority: 8,
					sortKey: 'none',
					title: 'Test issue title 5',
				},
				{
					id: 'test-issue-id-5',
					description: 'Test issue description 5',
					priority: 9,
					sortKey: 'none',
					title: 'Test issue title 5',
				},
				{
					id: 'test-issue-id-5',
					description: 'Test issue description 5',
					priority: 10,
					sortKey: 'urgent',
					title: 'Test issue title 5',
				},
			],
		},
		{
			id: 'test-category-id-2',
			category: 'Selling restrictions',
			children: [
				{
					id: 'test-issue-id-2',
					description: 'Test issue description 2',
					priority: 1,
					sortKey: 'urgent',
					title: 'Test issue title 2',
				},
				{
					id: 'test-issue-id-2',
					description: 'Test issue description 2',
					priority: 2,
					sortKey: 'urgent',
					title: 'Test issue title 2',
				},
			],
		},
		{
			id: 'test-category-id-3',
			category: 'Profitability',
			children: [
				{
					id: 'test-issue-id-3',
					description: 'Test issue description 3',
					priority: 3,
					sortKey: 'none',
					title: 'Test issue title 3',
				},
			],
		},
	]);

	const deleteIssue = (groupId: string, id: string) => {
		update((scannerIssueGroups: IssueGroup[]) =>
			scannerIssueGroups.filter((ig) => ig.id === groupId)
		);
	};

	const createIssue = (
		groupId: string,
		data: {
			description: string;
			priority: number;
			sortKey: 'none' | 'urgent';
			title: string;
		}
	) => {
		const handleCreateIssue = (scannerIssueGroups: IssueGroup[]) => {
			// create the new issue
			const newIssue: Issue = {
				id: uuidv4(),
				...data,
			};

			// make a copy of the array
			let tempScannerIssueGroups = [...scannerIssueGroups];

			// search for the appropriate group id
			for (let i in tempScannerIssueGroups) {
				if (tempScannerIssueGroups[i].id === groupId) {
					// insert the new issue and sort by priority
					tempScannerIssueGroups[i].children = [
						...tempScannerIssueGroups[i].children,
						newIssue,
					].sort((a, b) => {
						return a.priority - b.priority;
					});
					break;
				}
			}

			return tempScannerIssueGroups;
		};

		update((scannerIssueGroups: IssueGroup[]) =>
			handleCreateIssue(scannerIssueGroups)
		);
	};

	const getFlattenedIssues = () => {
		const issueGroups = get(scannerIssueGroups);

		return issueGroups.flatMap((ig) => ig.children);
	};

	return {
		createIssue,
		deleteIssue,
		getFlattenedIssues,
		set,
		subscribe,
	};
};

export const scannerIssueGroups = createscannerIssueGroups();

export const scannerIssues = derived(
	scannerIssueGroups,
	($scannerIssueGroups) => $scannerIssueGroups.flatMap((ig) => ig.children)
);
