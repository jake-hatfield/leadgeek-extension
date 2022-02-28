import { render, cleanup } from '@testing-library/svelte';
import {
	findByRole,
	findByTestId,
	queryByTestId,
	within,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// component
import Nav from '@components/navigation/Nav.svelte';

describe('main nav without props', () => {
	let nav;

	beforeEach(async () => {
		const { findByRole } = render(Nav);

		nav = await findByRole('navigation');
	});

	afterEach(cleanup);

	test('should render', () => {
		expect(nav).toBeInTheDocument();
	});

	describe('main nav user modal', () => {
		let modalButton;

		beforeEach(async () => {
			modalButton = await within(nav).findByTestId(
				'main-nav-user-modal-button'
			);
		});

		afterEach(cleanup);

		test('should render', () => {
			expect(modalButton).toBeInTheDocument();
		});

		test.todo('Make sure the button renders the first initial of the user');

		describe('main nav user modal', () => {
			let userModal;

			beforeEach(async () => {
				userModal = await queryByTestId(nav, 'main-nav-user-modal');
			});

			afterEach(cleanup);

			test('should not render by default', () => {
				expect(userModal).not.toBeInTheDocument();
			});

			test('should render on click', async () => {
				await userEvent.click(modalButton);

				userModal = await queryByTestId(nav, 'main-nav-user-modal');

				expect(userModal).toBeInTheDocument();
			});

			test('should close on click outside', async () => {
				await userEvent.click(modalButton);

				await userEvent.click(document.body);

				expect(userModal).not.toBeInTheDocument();
			});

			test('should close on double click', async () => {
				await userEvent.dblClick(modalButton);

				userModal = await queryByTestId(nav, 'main-nav-user-modal');

				expect(userModal).not.toBeInTheDocument();
			});

			describe('main nav user modal search', () => {
				let searchButton;

				beforeEach(async () => {
					await userEvent.click(modalButton);

					userModal = await queryByTestId(nav, 'main-nav-user-modal');

					searchButton = await queryByTestId(
						userModal,
						'main-nav-search-button'
					);
				});

				afterEach(cleanup);

				test('should render', () => {
					expect(searchButton).toBeInTheDocument();
				});

				describe('main nav user modal search input', () => {
					let searchInput;

					beforeEach(async () => {
						searchInput = await queryByTestId(nav, 'main-nav-search-input');
					});

					afterEach(cleanup);

					test('should not render by default', () => {
						expect(searchInput).not.toBeInTheDocument();
					});

					test('should render on click', async () => {
						await userEvent.click(searchButton);

						searchInput = await queryByTestId(nav, 'main-nav-search-input');

						expect(searchInput).toBeInTheDocument();
					});

					test('should close on double click', async () => {
						await userEvent.dblClick(searchButton);

						searchInput = await queryByTestId(nav, 'main-nav-search-input');

						expect(searchInput).not.toBeInTheDocument();
					});

					describe('main nav search button close', () => {
						let searchCloseButton;

						beforeEach(async () => {
							searchCloseButton = await queryByTestId(
								nav,
								'main-nav-search-button-close'
							);
						});

						afterEach(cleanup);

						test('should not render', () => {
							expect(searchCloseButton).not.toBeInTheDocument();
						});

						test('should render on click', async () => {
							await userEvent.click(searchButton);

							searchCloseButton = await queryByTestId(
								nav,
								'main-nav-search-button-close'
							);

							expect(searchCloseButton).toBeInTheDocument();
						});

						test.todo('should close on click');
					});
				});
			});
		});
	});

	describe('main nav logo', () => {
		let logo;

		beforeEach(async () => {
			logo = await findByRole(nav, 'link');
		});

		afterEach(cleanup);

		test('should render', async () => {
			let logoImg = await findByTestId(logo, 'logo');

			expect(logoImg).toBeInTheDocument();
		});
	});

	describe('main nav close button', () => {
		let closeButton;

		beforeEach(async () => {
			closeButton = await findByTestId(nav, 'main-nav-close-button');
		});

		afterEach(cleanup);

		test('should render', () => {
			expect(closeButton).toBeInTheDocument();
		});
	});
});
