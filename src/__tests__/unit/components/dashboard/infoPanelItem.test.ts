import { fireEvent, render, waitFor, within } from '@testing-library/svelte';
import '@testing-library/jest-dom';

// component
import InfoPanelIssue from '@components/dashboard/InfoPanelItem.svelte';

// store
import { scannerIssues, scannerStatus } from '@stores/product';

// types
import type Issue from '$types/Issue';

// TODO<Jake>: Should only show button on mouse enter

describe('active state with one issue', () => {
	let issue: HTMLElement,
		title: HTMLElement,
		description: HTMLElement,
		button: HTMLElement;

	const testIssues: Issue[] = [
		{
			id: 'test-issue-id-1',
			category: '',
			description: 'Test issue description 1',
			priority: 1,
			sortKey: 'urgent',
			title: 'Test issue title 1',
		},
	];

	scannerIssues.set(testIssues);
	scannerStatus.set('idle');

	beforeEach(async () => {
		const { findByTestId } = render(InfoPanelIssue, {
			issue: testIssues[0],
		});

		issue = await findByTestId('test-issue-id-1');

		title = within(issue).getByText(/^Test issue title 1$/);
		description = within(issue).getByText(/^Test issue description 1$/);

		await fireEvent.mouseEnter(issue);

		await waitFor(() => {
			button = within(issue).getByRole('button', {
				name: 'clear-issue-button',
			});
		});
	});

	test('should render with title, description, and clear button', () => {
		expect(issue).toBeInTheDocument();
		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('should clear/decrement in store on button click', async () => {
		await fireEvent.click(button);

		let issues;

		const getIssues = scannerIssues.subscribe((i) => {
			issues = i;
		});

		getIssues();

		await waitFor(() => {
			expect(issues).toStrictEqual([]);
		});
	});
});
