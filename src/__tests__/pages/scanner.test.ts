// packages
import { waitFor, within } from '@testing-library/svelte';
import '@testing-library/jest-dom';

// lib
import renderWithRouter from '@lib/routerHelpers/renderWithRouter';

// component
import Scanner from '@pages/Scanner.svelte';
import { fireEvent } from '@testing-library/dom';

describe('Issue Scanner page', () => {
	let component;

	beforeEach(() => {
		const { getByTestId } = renderWithRouter(Scanner);

		component = getByTestId('issue-scanner');
	});

	test('it should render', () => {
		expect(component).toBeInTheDocument();
	});

	describe('search bar', () => {
		let searchInput;

		beforeEach(() => {
			searchInput = within(component).getByPlaceholderText(
				'Search for a feature...'
			);
		});

		test('it should render', () => {
			expect(searchInput).toBeInTheDocument();
		});

		describe('search hotkeys', () => {
			test('it should render the ctrl + k button without a query and focus input', () => {
				let searchButton = within(component).getByTestId('search-button');

				expect(searchButton).toBeInTheDocument();

				fireEvent.click(searchButton);

				expect(document.activeElement).toEqual(searchInput);
			});

			test('it should render the ESC button with a query and clear input value', () => {
				let escButton;

				fireEvent.change(searchInput, { target: { value: 'abc123' } });

				waitFor(() => {
					escButton = within(component).getByTestId('esc-button');

					expect(escButton).toBeInTheDocument();

					fireEvent.click(escButton);

					waitFor(() => {
						expect(searchInput).toHaveValue('');
					});
				});
			});
		});

		describe('searching functionality', () => {
			let featureList;

			beforeEach(() => {
				featureList = within(component).queryByTestId('feature-list');
			});

			test('it should render the feature list without a query', () => {
				expect(featureList).toBeInTheDocument();
			});
		});
	});
});
