import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

// component
import Icon from '@components/utils/Icon.svelte';

describe('icon', () => {
	test('should not render on invalid title', async () => {
		const { queryByRole } = render(Icon, {
			type: 'solid',
			title: 'fake-icon',
		});

		const icon = await queryByRole('img');

		expect(icon).not.toBeInTheDocument();
	});

	test('should render', async () => {
		const { findByRole } = render(Icon, {
			type: 'solid',
			title: 'academic-cap',
		});

		const icon = await findByRole('img');

		expect(icon).toBeInTheDocument();
	});
});
