import {
	fireEvent,
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

// TODO<Jake>: Loading state should be present initially
// TODO<Jake>: Detailed list should show array of issues
// TODO<Jake>: Clearing an issue changes the count
// TODO<Jake>: Issues have a categorization header: https://dribbble.com/shots/17502424-Notifications-Recommendations/attachments/12640754?mode=media
// TODO<Jake>: Clear button for issue groups
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

	beforeEach(async () => {
		const { findByTestId, queryByTestId } = render(InfoPanel);

		scannerIssues.set([
			{
				id: 'test-issue-id-1',
				category: '',
				description: 'Test issue description 1',
				priority: 1,
				sortKey: 'urgent',
				title: 'Test issue title 1',
			},
			{
				id: 'test-issue-id-2',
				category: '',
				description: 'Test issue description 2',
				priority: 2,
				sortKey: 'none',
				title: 'Test issue title 2',
			},
		]);
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
	});

	test.todo('should stack the cards by group & priority');
});
