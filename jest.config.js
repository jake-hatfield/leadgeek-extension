const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
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
	testEnvironment: 'jsdom',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	modulePaths: ['<rootDir>'],
	moduleFileExtensions: ['js', 'ts', 'svelte'],
};
