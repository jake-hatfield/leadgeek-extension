import { render, cleanup } from '@testing-library/svelte';
import { findByTestId, queryByTestId, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// component
import InfoPanel from '@components/dashboard/InfoPanel.svelte';

describe('info panel without props', () => {
	test.todo('write test');
});
