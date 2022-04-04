import { fireEvent, render, queryByTestId } from '@testing-library/svelte';
import '@testing-library/jest-dom';

// component
import Input from '@components/utils/Input.svelte';

describe('input [text]', () => {
	let input;
	let label;
	let eyeIcon;
	beforeEach(async () => {
		const { getByLabelText, getByText, queryByTestId } = render(Input, {
			id: 'test-id',
			type: 'text',
			label: 'test-label',
			value: 'test value',
		});
		input = await getByLabelText('test-label', { selector: 'input' });
		label = await getByText('test-label', { selector: 'label' });
		eyeIcon = await queryByTestId('icon-show-password');
	});

	test('should render', () => {
		expect(input).toBeInTheDocument();
		expect(label).toBeInTheDocument();
	});

	test('should not render show password icon', () => {
		expect(eyeIcon).not.toBeInTheDocument();
	});
});

describe('input [password]', () => {
	let container;
	let input;
	let label;
	let showPasswordButton;
	beforeEach(async () => {
		const { getByLabelText, getByText, getByTestId } = render(Input, {
			id: 'test-id',
			type: 'password',
			label: 'test-label',
			value: 'test value',
			isPassword: true,
		});
		container = await getByTestId('input-container');
		input = await getByLabelText('test-label', { selector: 'input' });
		label = await getByText('test-label', { selector: 'label' });
		showPasswordButton = await getByTestId('show-password-text');
	});

	test('should render', () => {
		expect(input).toBeInTheDocument();
		expect(label).toBeInTheDocument();
		expect(showPasswordButton).toBeInTheDocument();
	});

	test('should change show password button on click', async () => {
		let hidePasswordButton;

		await fireEvent.click(showPasswordButton);

		hidePasswordButton = await queryByTestId(container, 'hide-password-text');

		expect(hidePasswordButton).toBeInTheDocument();
	});
});
