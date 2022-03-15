import { fireEvent, render, screen } from '@testing-library/svelte';
import { findByTestId } from '@testing-library/dom';
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
		alert.create({
			type: 'success',
			title: 'Test alert',
			description: 'This is a test',
		});

		const { findByTestId } = render(Alert);

		alertModal = await findByTestId('alert');
	});

	test('should render on alert.create()', () => {
		expect(alertModal).toBeInTheDocument();
	});

	describe('closing functionality', () => {
		test('should close automatically after 4 seconds', async () => {
			alertModal = screen.findByTestId('alert');

			expect(alertModal).not.toBeInTheDocument();
		});

		test('should close on alert.delete()', async () => {
			alert.delete();

			alertModal = screen.findByTestId('alert');

			expect(alertModal).not.toBeInTheDocument();
		});

		test('should close on button click', async () => {
			const closeButton = await findByTestId(alertModal, 'alert-close');

			await fireEvent.click(closeButton);

			alertModal = screen.findByTestId('alert');

			expect(alertModal).not.toBeInTheDocument();
		});
	});
});
