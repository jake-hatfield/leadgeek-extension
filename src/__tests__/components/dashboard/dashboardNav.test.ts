import {
	fireEvent,
	screen,
	queryByTestId,
	within,
	waitFor,
} from '@testing-library/svelte';
import '@testing-library/jest-dom';

// component
import DashboardNav from '@components/dashboard/DashboardNav.svelte';

// lib
import renderWithRouter from '@lib/routerHelpers/renderWithRouter';

// stores
import { layout } from '@stores/layout';
import { status } from '@stores/product';

describe('dashboard nav without layout state', () => {
	describe('loading state', () => {
		let skeleton;

		beforeEach(async () => {
			layout.set([]);

			const component = renderWithRouter(DashboardNav, {
				prevDashboard: '',
				nextDashboard: '',
			});

			skeleton = await component.findByTestId('loading-skeleton');
		});

		test('should render skeleton', () => {
			expect(skeleton).toBeInTheDocument();
		});
	});

	describe('idle state', () => {
		let nav;

		beforeEach(async () => {
			const { findByRole } = renderWithRouter(DashboardNav, {
				prevDashboard: '',
				nextDashboard: '',
			});

			status.set('idle');

			nav = await findByRole('navigation');
		});

		describe('dashboard nav select', () => {
			let select;

			beforeEach(async () => {
				select = await within(nav).findByTestId('dashboard-select');
			});

			test('should contain null text', () => {
				expect(select).toHaveTextContent('Create a dashboard...');
			});

			describe('dashboard nav select options', () => {
				let options;

				beforeEach(async () => {
					options = await queryByTestId(nav, 'dashboard-select-options');
				});

				test('should contain null text', async () => {
					await fireEvent.click(select);

					options = await queryByTestId(nav, 'dashboard-select-options');

					expect(options).toHaveTextContent('Create a dashboard below 👇');
				});
			});
		});
	});
});

describe('dashboard nav with layout state', () => {
	let nav;

	beforeEach(async () => {
		layout.createDashboard('Dashboard #1');

		const { queryByRole } = renderWithRouter(DashboardNav, {
			prevDashboard: '',
			nextDashboard: '',
		});

		nav = await queryByRole('navigation');
	});

	test('should render', async () => {
		expect(nav).toBeInTheDocument();
	});

	describe('dashboard nav select', () => {
		let select;

		beforeEach(async () => {
			select = await within(nav).findByTestId('dashboard-select');
		});

		test('should render', () => {
			expect(select).toBeInTheDocument();
		});

		test('should contain first dashboard option text', async () => {
			await waitFor(() => {
				expect(select).toHaveTextContent('Dashboard #1');
			});
		});

		describe('options list', () => {
			let options;

			beforeEach(async () => {
				options = await queryByTestId(nav, 'dashboard-select-options');
			});

			test('should not render by default', () => {
				expect(options).not.toBeInTheDocument();
			});

			test('should render on click', async () => {
				await fireEvent.click(select);

				options = await queryByTestId(nav, 'dashboard-select-options');

				expect(options).toBeInTheDocument();
			});

			test('should close on click outside', async () => {
				await fireEvent.click(select);

				await fireEvent.click(document.body);

				expect(options).not.toBeInTheDocument();
			});

			test('should close on double click', async () => {
				await fireEvent.doubleClick(select);

				await waitFor(() => {
					expect(options).not.toBeInTheDocument();
				});
			});

			describe('create dashboard button', () => {
				let button;

				beforeEach(async () => {
					await fireEvent.click(select);

					button = await screen.findByTestId('dashboard-select-button');
				});

				test('should render', () => {
					expect(button).toBeInTheDocument();
				});

				test('should contain CTA text', () => {
					expect(button).toHaveTextContent('Add dashboard');
				});

				test('should create a new option on click', async () => {
					await fireEvent.click(button);
				});
			});
		});
	});

	// TODO<Jake>: Test dashboardNavOptions in this suite
});
