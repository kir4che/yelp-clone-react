import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/yelp-clone-react/',
	plugins: [react()],
	optimizeDeps: {
		include: ['@vis.gl/react-google-maps'],
	},
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
})
