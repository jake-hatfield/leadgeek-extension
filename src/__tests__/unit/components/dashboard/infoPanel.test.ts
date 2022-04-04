import {
	fireEvent,
	getAllByRole,
	render,
	screen,
	waitFor,
	within,
} from '@testing-library/svelte';
import '@testing-library/jest-dom';

// component
import InfoPanel from '@components/dashboard/InfoPanel.svelte';

// store
import { scannerStatus, scannerIssues } from '@stores/product';
import { getByTestId } from '@testing-library/dom';

// types
import type Issue from '$types/Issue';

// TODO<Jake>: Loading state should be present initially
// TODO<Jake>: Switching tabs changes view

describe('loading state', () => {
	test.todo('loading state');
});

describe('null state', () => {
	let infoPanelButton;

	beforeEach(async () => {
		const { findByTestId } = render(InfoPanel);

		scannerIssues.set([]);
		scannerStatus.set('idle');

		infoPanelButton = await findByTestId('info-panel-button-inactive');
	});

	test('should render with correct text', () => {
		expect(infoPanelButton).toBeInTheDocument();
		expect(infoPanelButton).toHaveTextContent('No issues found 🎉');
	});

	test('should close on click', async () => {
		await fireEvent.click(infoPanelButton);

		await waitFor(() => expect(infoPanelButton).not.toBeInTheDocument());
	});
});

describe('active state', () => {
	let infoPanelButton;
	let infoPanelDetails;

	const testIssues: Issue[] = [
		{
			id: 'test-issue-id-1',
			category: 'testGroup1',
			description: 'Test issue description 1',
			priority: 1,
			sortKey: 'urgent',
			title: 'Test issue title 1',
		},
		{
			id: 'test-issue-id-2',
			category: 'testGroup2',
			description: 'Test issue description 2',
			priority: 2,
			sortKey: 'none',
			title: 'Test issue title 2',
		},
	];

	beforeEach(async () => {
		const { findByTestId, queryByTestId } = render(InfoPanel);

		scannerIssues.set(testIssues);
		scannerStatus.set('idle');

		infoPanelButton = await findByTestId('info-panel-button-active');
		infoPanelDetails = await queryByTestId('info-panel-details');
	});

	test('should render', () => {
		expect(infoPanelButton).toBeInTheDocument();
	});

	test('should not render details by default', () => {
		expect(infoPanelDetails).not.toBeInTheDocument();
	});

	test('should have corrent text', async () => {
		expect(infoPanelButton).toHaveTextContent(
			'2 issues require your attention 🔎'
		);

		scannerIssues.set([
			{
				id: 'test-issue-id-1',
				category: '',
				description: 'Test issue description 1',
				priority: 1,
				sortKey: 'urgent',
				title: 'Test issue title 1',
			},
		]);

		await waitFor(() =>
			expect(infoPanelButton).toHaveTextContent(
				'1 issue requires your attention 🔎'
			)
		);
	});

	test('should close on click & open full details', async () => {
		await fireEvent.click(infoPanelButton);

		await waitFor(() => {
			infoPanelDetails = screen.getByTestId('info-panel-details');

			expect(infoPanelDetails).toBeInTheDocument();
			expect(infoPanelButton).not.toBeInTheDocument();
		});
	});

	describe('details', () => {
		let sortingHeadersList;
		let sortingHeadersListItems;

		beforeEach(async () => {
			await fireEvent.click(infoPanelButton);

			await waitFor(() => {
				infoPanelDetails = screen.getByTestId('info-panel-details');
				sortingHeadersList = screen.getByRole('list', {
					name: /sorting-headers/i,
				});
				const { getAllByRole } = within(sortingHeadersList);
				sortingHeadersListItems = getAllByRole('listitem');
			});
		});

		test('should close on click & re-activate button', async () => {
			let closeButton = screen.getByTestId('info-panel-close-button');

			await fireEvent.click(closeButton);

			await waitFor(() => {
				infoPanelDetails = screen.queryByTestId('info-panel-details');
				infoPanelButton = screen.queryByTestId('info-panel-button-active');
				expect(infoPanelButton).toBeInTheDocument();
				expect(infoPanelDetails).not.toBeInTheDocument();
			});
		});

		test('should render sorting headers', () => {
			expect(sortingHeadersList).toBeInTheDocument();
		});

		test('sorting headers should display correct title & values', () => {
			const sortingHeadersListItemNames = sortingHeadersListItems.map((i) =>
				i.textContent.trim()
			);

			expect(sortingHeadersListItems.length).toBe(2);
			expect(sortingHeadersListItemNames).toEqual(['All 2', 'Urgent 1']);
		});

		test('switching sorting headers changes the issue items', async () => {
			// click on the next tab
			// expect the # and titles of items to change
		});

		test('should close & keep button de-activated on "clear all"', async () => {
			const clearAllButton = screen.getByTestId('info-panel-button-clear-all');

			expect(clearAllButton).toBeInTheDocument();

			await fireEvent.click(clearAllButton);

			let issues;

			const getIssues = scannerIssues.subscribe((i) => {
				issues = i;
			});

			getIssues();

			await waitFor(() => {
				infoPanelDetails = screen.queryByTestId('info-panel-details');
				infoPanelButton = screen.queryByTestId('info-panel-button-active');
				expect(infoPanelDetails).not.toBeInTheDocument();
				expect(infoPanelButton).not.toBeInTheDocument();
				expect(issues).toStrictEqual([]);
			});
		});

		describe('issue items', () => {
			let issueItemList, issueItems;

			beforeEach(() => {
				issueItemList = getByTestId(
					infoPanelDetails,
					'info-panel-details-issue-items'
				);

				issueItems = getAllByRole(issueItemList, 'listitem');
			});

			test('should render list and corrent # of items', () => {
				expect(issueItemList).toBeInTheDocument();
				expect(issueItems.length).toBe(2);
			});

			test('should change active count on IssueItem clear', async () => {
				const urgentTestItem = getAllByRole(issueItemList, 'listitem')[0];

				await fireEvent.mouseEnter(urgentTestItem);

				let urgentTestItemButton;

				await waitFor(() => {
					urgentTestItemButton = getByTestId(
						urgentTestItem,
						'clear-issue-button'
					);
				});

				await fireEvent.click(urgentTestItemButton);

				await waitFor(() => {
					const sortingHeadersListItemNames = sortingHeadersListItems.map((i) =>
						i.textContent.trim()
					);

					expect(sortingHeadersListItemNames).toEqual(['All 1', 'Urgent 0']);
				});
			});

			test('should stack the cards by group & priority', () => {
				scannerIssues.set([
					...testIssues,
					{
						id: 'test-issue-id-3',
						category: 'testGroup1',
						description: 'Test issue description 3',
						priority: 2,
						sortKey: 'urgent',
						title: 'Test issue title 3',
					},
				]);

				// YO FUTURE JAKE PICK UP HERE
			});
		});
	});
});
