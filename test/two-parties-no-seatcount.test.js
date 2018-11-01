'use strict'

const chart = require('..')
const tape = require('tape')

const expected = require('./data/two-parties-no-seatcount')

const parliament = {
	'party1': {
		'seats': 1,
		'colour': '#000'
	},
	'party2': {
		'seats': 1,
		'colour': '#fff'
	}
}
const seatCount = false

tape('Two parties with 1 seat each, seatCount false', t => {
	const svg = chart(parliament, seatCount)
	t.deepEqual(svg, expected, 'Generated virtual dom SVG and expected output are the same')
	t.end()
})
