import { toHtml } from 'hast-util-to-html'
import svgify from '../src/index.js'

const germanBundestag = {
	linke: {
		seats: 64,
		colour: '#a08',
	},
	spd: {
		seats: 193,
		colour: '#e02',
	},
	gruene: {
		seats: 63,
		colour: '#0b2',
	},
	union: {
		seats: 311,
		colour: '#333',
	},
}

process.stdout.write(toHtml(svgify(germanBundestag, true)))
