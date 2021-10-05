'use strict'

const chart = require('..')
const tape = require('tape')
const { normalize: n } = require('./util')

const expected = require('./data/two-parties-seatcount')

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
const seatCount = true

tape('Two parties with 1 seat each, seatCount true', t => {
	const svg = chart(parliament, seatCount)
	t.deepEqual(n(svg), n(expected), 'Generated virtual dom SVG and expected output are the same')
	t.end()
})
