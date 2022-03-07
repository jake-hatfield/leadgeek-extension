import '@testing-library/jest-dom';

// functions
import { getInitial } from '@lib/stringHelpers';

describe('getInitials helper', () => {
	test('it should be defined', () => {
		expect(getInitial('Jacob Hatfield')).toBeDefined;
	});

	test('it returns the first letter of a word', () => {
		expect(getInitial('Jacob')).toBe('J');
	});

	test('it returns the first letter of the first word', () => {
		expect(getInitial('Jacob Hatfield')).toBe('J');
	});
});
