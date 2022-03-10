import '@testing-library/jest-dom';

// functions
import { getFirstWord, getInitial } from '@lib/stringHelpers';

describe('getFirstWord helper', () => {
	test('it should be defined', () => {
		expect(getFirstWord('Jacob Hatfield')).toBeDefined;
	});

	test('it returns the first word of a phrase', () => {
		expect(getFirstWord('Jacob Hatfield')).toBe('Jacob');
	});
});

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
