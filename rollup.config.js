import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import path from 'path';
import { terser } from 'rollup-plugin-terser';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import { config } from 'dotenv';

config();

const production = !process.env.ROLLUP_WATCH;
const projectRootDir = path.resolve(__dirname);

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn(
				'npm',
				['run', 'start', '--', '--dev'],
				{
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				}
			);

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		},
	};
}

export default [
	{
		input: 'src/index.ts',
		output: {
			sourcemap: 'inline',
			format: 'iife',
			name: 'app',
			file: 'public/build/bundle.js',
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess({
					sourceMap: !production,
				}),
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production,
				},
			}),

			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),
			// env variables
			injectProcessEnv({
				isProd: production,
				keepaApiSecret: process.env.KEEPA_API_SECRET,
			}),
			typescript({
				rootDir: './src',
				sourceMap: !production,
				inlineSources: !production,
			}),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve(),
			// Watches directories and refresh the
			// browser on changes when not in production
			!production && livereload('public'),
			!production && livereload('src'),
			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser(),

			// paths
			alias({
				entries: [
					{
						find: '@assets',
						replacement: path.resolve(projectRootDir, 'src/assets'),
					},
					{
						find: '@components',
						replacement: path.resolve(projectRootDir, 'src/components'),
					},
					{
						find: '@lib',
						replacement: path.resolve(projectRootDir, 'src/lib'),
					},
					{
						find: '@pages',
						replacement: path.resolve(projectRootDir, 'src/pages'),
					},
					{
						find: '@public',
						replacement: path.resolve(projectRootDir, 'src/public'),
					},
					{
						find: '@routes',
						replacement: path.resolve(projectRootDir, 'src/routes'),
					},
					{
						find: '@stores',
						replacement: path.resolve(projectRootDir, 'src/stores'),
					},
					{
						find: '$types',
						replacement: path.resolve(projectRootDir, 'src/types'),
					},
					{
						find: '@utils',
						replacement: path.resolve(projectRootDir, 'src/utils'),
					},
				],
			}),
		],
		watch: {
			clearScreen: false,
		},
	},
	// compile background script
	{
		input: 'src/background.ts',
		output: {
			sourcemap: 'inline',
			format: 'iife',
			file: 'public/build/background.js',
		},
		plugins: [resolve(), commonjs()],
		watch: {
			clearScreen: false,
		},
	},
	// compile content script
	{
		input: 'src/content.ts',
		output: {
			sourcemap: 'inline',
			format: 'iife',
			file: 'public/build/content.js',
		},
		plugins: [resolve(), commonjs()],
		watch: {
			clearScreen: false,
		},
	},
];
