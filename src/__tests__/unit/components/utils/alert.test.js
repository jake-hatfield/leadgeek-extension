import { fireEvent, render } from '@testing-library/svelte';
import { queryByTestId } from '@testing-library/dom';
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
	let containerEl;

	beforeEach(async () => {
		alert.create({
			type: 'success',
			title: 'Test alert',
			description: 'This is a test',
		});

		const { getByTestId, container } = render(Alert);

		alertModal = await getByTestId('alert');
		containerEl = container;
	});

	test('should render on alert.create()', () => {
		expect(alertModal).toBeInTheDocument();
	});

	describe('closing functionality', () => {
		test('should close automatically after 3 seconds', async () => {
			// wait 3 seconds and 200 ms for animation
			await new Promise((r) => setTimeout(r, 4200));

			alertModal = queryByTestId(containerEl, 'alert');

			expect(alertModal).not.toBeInTheDocument();
		});

		test('should close on alert.delete()', async () => {
			alert.delete();

			await new Promise((r) => setTimeout(r, 200));

			alertModal = queryByTestId(containerEl, 'alert');

			expect(alertModal).not.toBeInTheDocument();
		});

		test('should close on button click', async () => {
			const closeButton = queryByTestId(alertModal, 'alert-close');

			await fireEvent.click(closeButton);

			await new Promise((r) => setTimeout(r, 200));

			alertModal = queryByTestId(containerEl, 'alert');

			expect(alertModal).not.toBeInTheDocument();
		});
	});
});
