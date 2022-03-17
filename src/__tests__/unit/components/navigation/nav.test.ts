import { fireEvent } from '@testing-library/svelte';
import {
	getByRole,
	getByTestId,
	queryByTestId,
	within,
} from '@testing-library/dom';
import '@testing-library/jest-dom';

// lib
import renderWithRouter from '@lib/routerHelpers/renderWithRouter';

// stores
import { status, user } from '@stores/auth';

// component
import Nav from '@components/navigation/AuthNav.svelte';

describe('main nav without props', () => {
	let nav;

	beforeEach(() => {
		status.set('idle');
		user.set({
			archivedLeads: [],
			billing: {
				paymentMethod: 'pm_1IikZyDdWoP4Ck9RAgZZ2EuB',
				last4: '4242',
				brand: 'visa',
			},
			comments: [],
			dateCreated: '2020-09-01T18:15:18.627Z',
			email: 'jake@leadgeek.io',
			lastLoggedIn: '2022-03-07T20:07:33.265Z',
			likedLeads: [],
			name: 'Jake Hatfield',
			notifications: [],
			referrals: {
				referred: {
					referrerlgid: null,
					wasReferred: false,
				},
				referrer: {
					clients: [],
					isReferrer: true,
					lgid: 'h4jj2q13',

					paypalEmail: null,
					pendingApplication: false,
				},
			},
			resetPwExpires: '2022-01-25T04:32:35.439Z',
			resetPwToken: null,
			role: 'master',
			settings: { filterGroups: Array(1) },
			subscription: {
				planIds: Array(1),
				cusId: 'cus_IlXa2jZr3AY8CW',
				subIds: Array(1),
			},
			extension: {
				layout: [
					{
						id: '1',
						dashboard: {
							id: '1',
							title: 'Dashboard #1',
							color: 'bg-teal-500',
						},
						widgets: [
							{
								id: '123',
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
				],
			},
		});

		const { getByRole } = renderWithRouter(Nav);

		nav = getByRole('navigation');
	});

	test('should render', () => {
		expect(nav).toBeInTheDocument();
	});

	describe('settings modal button', () => {
		let modalButton;

		beforeEach(async () => {
			modalButton = await within(nav).queryByTestId('main-nav-settings-button');
		});

		test('should render', () => {
			expect(modalButton).toBeInTheDocument();
		});

		test.todo('Make sure the button renders the first initial of the user');

		describe('settings modal', () => {
			let settingsModal;

			beforeEach(() => {
				settingsModal = queryByTestId(nav, 'main-nav-settings-modal');
			});

			test('should not render by default', () => {
				expect(settingsModal).not.toBeInTheDocument();
			});

			test('should render on click', async () => {
				await fireEvent.click(modalButton);

				settingsModal = queryByTestId(nav, 'main-nav-settings-modal');

				expect(settingsModal).toBeInTheDocument();
			});

			test('should close on click outside', async () => {
				await fireEvent.click(modalButton);

				await fireEvent.click(document.body);

				expect(settingsModal).not.toBeInTheDocument();
			});

			test('should close on double click', async () => {
				await fireEvent.doubleClick(modalButton);

				settingsModal = queryByTestId(nav, 'main-nav-settings-modal');

				expect(settingsModal).not.toBeInTheDocument();
			});
		});
	});

	describe('main nav logo', () => {
		let logo;

		beforeEach(() => {
			logo = getByRole(nav, 'link');
		});

		test('should render', () => {
			let logoImg = getByTestId(logo, 'logo');

			expect(logoImg).toBeInTheDocument();
		});
	});

	describe('main nav close button', () => {
		let closeButton;

		beforeEach(() => {
			closeButton = getByTestId(nav, 'main-nav-close-button');
		});

		test('should render', () => {
			expect(closeButton).toBeInTheDocument();
		});
	});
});
