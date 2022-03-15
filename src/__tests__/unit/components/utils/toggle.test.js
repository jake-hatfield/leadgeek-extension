import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

// components
import Toggle from '@components/utils/Toggle.svelte';

describe('toggle with props', () => {
	let toggle, containerEl;

	beforeEach(() => {
		const { getByTestId, container } = render(Toggle, {
			name: 'test',
			defaultChecked: false,
			onChange: () => console.log('test'),
		});
		toggle = getByTestId('toggle');
		containerEl = container;
	});

	test('should render', () => {
		expect(toggle).toBeInTheDocument();
	});
});
