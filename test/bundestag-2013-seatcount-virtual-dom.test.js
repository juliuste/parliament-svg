'use strict'

import hFunction from 'virtual-hyperscript-svg'
import chart from '../src/index.js'
import tape from 'tape'
import { normalize as n } from './util.js'

import expected from './data/bundestag-2013-no-seatcount-virtual-dom.js'

const parliament = {
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

tape('Bundestag federal election results from 2013, seatCount not set (defaults to false), custom h function', t => {
	const svg = chart(parliament, { hFunction })
	t.deepEqual(n(svg), n(expected), 'Generated virtual dom SVG and expected output are the same')
	t.end()
})
