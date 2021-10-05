'use strict'

import chart from '../src/index.js'
import tape from 'tape'
import { normalize as n } from './util.js'

import expected from './data/two-parties-no-seatcount.js'

const parliament = {
	party1: {
		seats: 1,
		colour: '#000',
	},
	party2: {
		seats: 1,
		colour: '#fff',
	},
}
const seatCount = false

tape('Two parties with 1 seat each, seatCount false', t => {
	const svg = chart(parliament, { seatCount })
	t.deepEqual(n(svg), n(expected), 'Generated virtual dom SVG and expected output are the same')
	t.end()
})
