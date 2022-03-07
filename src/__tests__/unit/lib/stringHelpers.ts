import '@testing-library/jest-dom';

// functions
import { getInitials } from '@lib/stringHelpers';

describe('getInitials helper', () => {
	test('it should be defined', () => {
		expect(getInitials('Jacob Hatfield')).toBeDefined();
	});
	test('it returns the first letter of the first word', () => {
		expect(getInitials('Jacob Hatfield')).toBeDefined;
	});
});
