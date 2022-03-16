import { fireEvent, render, screen } from '@testing-library/svelte';
import { findByTestId, getByText, getByRole } from '@testing-library/dom';
import '@testing-library/jest-dom';

// components
import Alert from '@components/utils/Alert.svelte';

// stores
import { alert } from '@stores/alert';

describe('alert without props', () => {
	test('should not render', () => {
		const { queryByTestId } = render(Alert);

		const alertModal = queryByTestId('alert');

		expect(alertModal).not.toBeInTheDocument();
	});
});

describe('alert with props', () => {
	let alertModal;

	beforeEach(async () => {
		const { findByTestId } = render(Alert);

		alert.create({
			type: 'success',
			title: 'Test alert',
			description: 'This is a test',
		});

		alertModal = await findByTestId('alert');
	});

	test('should render on alert.create()', async () => {
		expect(alertModal).toBeInTheDocument();
	});

	test('should render correct title', () => {
		const title = getByRole(alertModal, 'heading', { level: 5 });

		expect(title).toHaveTextContent('Test alert');
	});

	test('should render the correct description', () => {
		const description = getByText(alertModal, 'This is a test');

		expect(description).toBeInTheDocument();
	});

	describe('closing functionality', () => {
		test('should close automatically after 4 seconds', async () => {
			await new Promise((r) => setTimeout(r, 4200));

			alertModal = screen.queryByTestId('alert');

			expect(alertModal).not.toBeInTheDocument();
		});

		test('should close on alert.delete()', async () => {
			alert.delete();

			await new Promise((r) => setTimeout(r, 4200));

			alertModal = screen.queryByTestId('alert');

			expect(alertModal).not.toBeInTheDocument();
		});

		test('should close on button click', async () => {
			const closeButton = await findByTestId(alertModal, 'alert-close');

			await fireEvent.click(closeButton);

			await new Promise((r) => setTimeout(r, 4200));

			alertModal = screen.queryByTestId('alert');

			expect(alertModal).not.toBeInTheDocument();
		});
	});
});
