module.exports = {
	mode: 'jit',
	content: ['./public/index.html', './src/**/*.svelte', './src/**/**/*.svelte'],
	theme: {
		extend: {
			colors: {
				purple: {
					100: '#E6E6FF',
					200: '#C4C6FF',
					300: '#A2A5FC',
					400: '#8888FC',
					500: '#7069FA',
					600: '#5D55FA',
					700: '#4D3DF7',
					800: '#3525E6',
					900: '#1D0EBE',
				},
				teal: {
					100: '#EFFCF6',
					200: '#C6F7E2',
					300: '#8EEDC7',
					400: '#65D6AD',
					500: '#3EBD93',
					600: '#27AB83',
					700: '#199473',
					800: '#147D64',
					900: '#0C6B58',
				},
				gray: {
					100: '#F0F4F8',
					200: '#E6EBF0',
					300: '#BCCCDC',
					400: '#9FB3C8',
					500: '#829AB1',
					600: '#627D98',
					700: '#486581',
					800: '#334E68',
					900: '#243B53',
				},
				darkGray: {
					100: '#1E2C3C',
					200: '#1C2936',
					300: '#1B2631',
					400: '#19222C',
					500: '#171E26',
				},
				pink: {
					100: '#FBB4FB',
					200: '#F993F9',
					300: '#F774F7',
					400: '#F555F5',
					500: '#F445F4',
					600: '#F224F2',
					700: '#E70DE7',
					800: '#D20CD2',
					900: '#BD0BBD',
				},
			},
		},
	},
	darkMode: 'class',
	plugins: [],
};
