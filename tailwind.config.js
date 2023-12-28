/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			padding: {
				30: '7.5rem',
			},
			width: {
				18: '4.5rem',
			},
			colors: {
				red: {
					600: '#D32322',
					700: '#C91F1E',
				},
			},
		},
	},
	plugins: [],
}
