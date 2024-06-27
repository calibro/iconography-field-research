import { defineConfig, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts';
import extractorSvelte from '@unocss/extractor-svelte';

export default defineConfig({
	theme: {
		colors: {
			primary: '#A08841',
			secondary: '#212529',
			'light-gray': '#D9D9D9'
		}
	},
	shortcuts: {
		btn: 'py-1 px-3 rounded-md inline-block w-fit',
		'btn-lg': 'py-2 px-6 rounded-md',
		'btn-primary': 'bg-primary text-white',
		'btn-secondary': 'bg-secondary text-white',
		'btn-disabled': 'opacity-50 cursor-default',
		'btn-alert': 'bg-red-700 text-white',
		'col-head': 'text-md font-bold border-b border-secondary p-2',
		'col-body': 'p-2 border-b border-gray-300',
		'toast': 'p-2 rounded-md',
		'toast-success': 'bg-green-100 border-1 border-green-700',
		'toast-alert': 'bg-red-100 border-1 border-red-700',
		'checkbox': 'w-4 h-4',
	},
	extractors: [extractorSvelte()],
	presets: [
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			},
			collections: {
				mdi: () => import('@iconify-json/mdi-light/icons.json').then((i) => i.default)
			}
		}),
		presetWebFonts({
			provider: 'google', // default provider
			fonts: {
				sans: {
					name: 'Inter',
					weights: ['400', '600', '700']
				}
			}
		}),
		presetUno()
	]
});
