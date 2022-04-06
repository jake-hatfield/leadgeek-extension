import { get, Writable, writable } from 'svelte/store';

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

const createScannerIssues = () => {
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

	const deleteIssue = (category: string, id: string) => {
		update((scannerIssueGroups: IssueGroup[]) =>
			scannerIssueGroups.filter((ig) => ig.category === category)
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
		const newIssue: Issue = {
			id: uuidv4(),
			...data,
		};

		const handleCreateIssue = (scannerIssueGroups: IssueGroup[]) => {
			let tempScannerIssueGroups = [...scannerIssueGroups];

			for (let i in tempScannerIssueGroups) {
				if (tempScannerIssueGroups[i].id === groupId) {
					const newSortedIssues = [
						...tempScannerIssueGroups[i].children,
						newIssue,
					];

					console.log(
						newSortedIssues.sort((a, b) => {
							return a.priority - b.priority;
						})
					);

					tempScannerIssueGroups[i].children = newSortedIssues.sort((a, b) => {
						return a.priority - b.priority;
					});
					break;
				}
			}

			return tempScannerIssueGroups;
		};

		// Create the new issue's data
		// find the right category
		// splice in by priority
		// CURRENT METHOD ONLY INSERTS AT END
		update((scannerIssueGroups: IssueGroup[]) =>
			handleCreateIssue(scannerIssueGroups)
		);
	};

	const getFlattenedIssues = () => {
		const issueGroups = get(scannerIssues);

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

export const scannerIssues = createScannerIssues();
