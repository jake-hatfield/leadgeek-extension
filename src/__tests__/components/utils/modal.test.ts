import {
	fireEvent,
	getByText,
	getByTestId,
	render,
	queryByTestId,
} from '@testing-library/svelte';
import '@testing-library/jest-dom';

// component
import Modal from '@components/utils/Modal.svelte';

describe('modal inactive state', () => {
	let modal;
	let containerEl;

	beforeEach(() => {
		const { queryByTestId, container } = render(Modal, {
			isActive: false,
			title: 'Placeholder title',
		});

		modal = queryByTestId('modal');
		containerEl = container;
	});

	test('should not render', () => {
		expect(modal).not.toBeInTheDocument();
	});
});

describe('modal with props', () => {
	let modal;
	let containerEl;

	beforeEach(() => {
		const { getByTestId, container } = render(Modal, {
			isActive: true,
			title: 'Placeholder title',
		});

		modal = getByTestId('modal');
		containerEl = container;
	});

	test('should render', () => {
		expect(modal).toBeInTheDocument();
	});

	test('should render with correct title', () => {
		const title = getByText(modal, 'Placeholder title');

		expect(title).toBeInTheDocument();
	});

	describe('closing functionality', () => {
		test('should close on button click', async () => {
			const button = getByTestId(modal, 'modal-close');

			await fireEvent.click(button);

			await new Promise((r) => setTimeout(r, 200));

			modal = queryByTestId(containerEl, 'modal');

			expect(modal).not.toBeInTheDocument();
		});
	});
});
