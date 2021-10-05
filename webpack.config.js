import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

export default {
	mode: 'production',
	entry: './docs/index.js',
	output: {
		path: resolve(dirname(fileURLToPath(import.meta.url)), 'docs/bundle'),
		filename: 'index.js',
	},
}
