import '@testing-library/jest-dom';
import renderWithRouter from '@lib/routerHelpers/renderWithRouter';

// components
import Dashboard from '@components/dashboard/Dashboard.svelte';

// store
import { status } from '@stores/product';

describe('dashboard without props', () => {
	// TODO<Jake>: Loading state

	describe('idle state', () => {
		let dashboard;

		beforeEach(async () => {
			const { findByTestId } = renderWithRouter(Dashboard);

			status.set('idle');

			dashboard = await findByTestId('dashboard');
		});

		test('should render', () => {
			expect(dashboard).toBeInTheDocument();
		});

		test.todo('should not render widgets');
	});
});
