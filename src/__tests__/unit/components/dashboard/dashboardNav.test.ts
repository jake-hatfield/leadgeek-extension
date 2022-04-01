import { fireEvent } from '@testing-library/svelte';
import { queryByTestId, within } from '@testing-library/dom';
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
				currentDashboard: null,
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
				currentDashboard: null,
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
	const dashboards = [
		{
			id: '1',
			default: true,
			title: 'Dashboard #1',
			color: 'bg-teal-500',
			widgets: [
				{
					id: '1',
					title: 'Profit analysis',
					data: [
						{ title: 'Est.sales/mo', value: 1500000 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 1500000 },
					],
				},
				{
					id: '1234',
					title: 'Sales/mo',
					data: [
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
				{
					id: '1263',
					title: 'Competition',
					data: [
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
				{
					id: '12333',
					title: 'Variations',
					data: [
						{ title: 'Est.sales/mo', value: 80 },
						{ title: 'Est.sales/mo', value: 79 },
						{ title: 'Est.sales/mo', value: 79 },
					],
				},
			],
		},
	];

	beforeEach(async () => {
		layout.set(dashboards);

		const { queryByRole } = renderWithRouter(DashboardNav, {
			currentDashboard: dashboards[0].title,
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

		test('should contain first dashboard option text', () => {
			expect(select).toHaveTextContent('Dashboard #1');
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

				options = await queryByTestId(nav, 'dashboard-select-options');

				expect(options).not.toBeInTheDocument();
			});

			describe('create dashboard button', () => {
				let button;

				beforeEach(async () => {
					await fireEvent.click(select);

					options = await queryByTestId(nav, 'dashboard-select-options');

					button = await within(options).queryByRole('button');
				});

				test('should render', () => {
					expect(button).toBeInTheDocument();
				});

				test('should contain CTA text', () => {
					expect(button).toHaveTextContent('Create a dashboard');
				});

				test('should create a new option on click', async () => {
					await fireEvent.click(button);
				});
			});
		});
	});

	// TODO<Jake>: Test dashboardNavOptions in this suite
});
