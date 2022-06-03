const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
	resolver: '<rootDir>/jestResolver.cjs',
	transformIgnorePatterns: ['<rootDir>/node_modules/(?!svelte-navigator)'],
	transform: {
		'^.+\\.svelte$': [
			'svelte-jester',
			{
				preprocess: true,
			},
		],
		'^.+\\.ts$': 'ts-jest',
		'^.+\\.js$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'ts', 'svelte'],
	testEnvironment: 'jsdom',
	modulePaths: ['<rootDir>'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
