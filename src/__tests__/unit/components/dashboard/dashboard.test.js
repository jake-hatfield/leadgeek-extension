import { render, cleanup } from '@testing-library/svelte';
import { findByTestId, queryByTestId, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// components
import Dashboard from '@components/dashboard/Dashboard.svelte';

// store
import { status } from '@stores/product';

describe('dashboard without props', () => {
	describe('loading state', () => {});

	describe('idle state', () => {
		let dashboard;

		beforeEach(async () => {
			const { findByTestId } = render(Dashboard, {
				widgets: [],
			});

			status.set('idle');

			dashboard = await findByTestId('dashboard');
		});

		afterEach(cleanup);

		test('should render', () => {
			expect(dashboard).toBeInTheDocument();
		});

		test.todo('should not render widgets', () => {});
	});
});
