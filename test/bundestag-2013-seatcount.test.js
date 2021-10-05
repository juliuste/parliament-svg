'use strict'

const chart = require('..')
const tape = require('tape')

const expected = require('./data/bundestag-2013-seatcount')

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
const seatCount = true

tape('Bundestag federal election results from 2013, seatCount true', t => {
	const svg = chart(parliament, seatCount)
	t.deepEqual(svg, expected, 'Generated virtual dom SVG and expected output are the same')
	t.end()
})
