'use strict'

const svg = require('virtual-hyperscript-svg')
const roundTo = require('round-precision')
const sl = require('sainte-lague')

const pi = Math.PI

const round = (x) => roundTo(x, 10)
const seatSum = (o) => {
	let result = 0
	for (let key in o) result += o[key].seats
	return result
}
const merge = (arrays) => {
	let result = []
	for (let list of arrays) result = result.concat(list)
	return result
}

const coords = (r, b) => ({
	x: round(r * Math.cos(b / r - pi)),
	y: round(r * Math.sin(b / r - pi))
})

const calculateSeatDistance = (seatCount, numberOfRings, r) => {
	const x = (pi * numberOfRings * r) / (seatCount - numberOfRings)
	const y = 1 + (pi * (numberOfRings - 1) * numberOfRings / 2) / (seatCount - numberOfRings)

	const a = x / y
	return a
}

const score = (m, n, r) => Math.abs(calculateSeatDistance(m, n, r) * n / r - (5 / 7))

const calculateNumberOfRings = (seatCount, r) => {
	let n = Math.floor(Math.log(seatCount) / Math.log(2)) || 1
	let distance = score(seatCount, n, r)

	let direction = 0
	if (score(seatCount, n + 1, r) < distance) direction = 1
	if (score(seatCount, n - 1, r) < distance && n > 1) direction = -1

	while (score(seatCount, n + direction, r) < distance && n > 0) {
		distance = score(seatCount, n + direction, r)
		n += direction
	}
	return n
}

const nextRing = (rings, ringProgress) => {
	let progressQuota, tQuota
	for (let index in rings) {
		tQuota = round((ringProgress[index] || 0) / rings[index].length)
		if (!progressQuota || tQuota < progressQuota) progressQuota = tQuota
	}
	for (let index in rings) {
		tQuota = round((ringProgress[index] || 0) / rings[index].length)
		if (tQuota === progressQuota) return index
	}
}

const generatePoints = (parliament, r0) => {
	const seatCount = seatSum(parliament)
	const numberOfRings = calculateNumberOfRings(seatCount, r0)
	const seatDistance = calculateSeatDistance(seatCount, numberOfRings, r0)

	// calculate ring radii
	let rings = []
	for (let i = 1; i <= numberOfRings; i++) {
		rings[i] = r0 - (i - 1) * seatDistance
	}

	// calculate seats per ring
	// todo: float to int
	rings = sl(rings, seatCount)

	const points = []
	let r, a, point

	// build seats
	// loop rings
	let ring
	for (let i = 1; i <= numberOfRings; i++) {
		ring = []
		// calculate ring-specific radius
		r = r0 - (i - 1) * seatDistance
		// calculate ring-specific distance
		a = (pi * r) / ((rings[i] - 1) || 1)

		// loop points
		for (let j = 0; j <= rings[i] - 1; j++) {
			point = coords(r, j * a)
			point.r = 0.4 * seatDistance
			ring.push(point)
		}
		points.push(ring)
	}

	// fill seats
	const ringProgress = Array(points.length).fill(0)
	for (let party in parliament) {
		for (let i = 0; i < parliament[party].seats; i++) {
			ring = nextRing(points, ringProgress)
			points[ring][ringProgress[ring]].fill = parliament[party].colour
			points[ring][ringProgress[ring]].party = party
			ringProgress[ring]++
		}
	}

	return merge(points)
}

const pointToSVG = (point) => svg('circle', {
	cx: point.x,
	cy: point.y,
	r: point.r,
	fill: point.fill,
	class: point.party
})

const generate = (parliament, seatCount) => {
	const radius = 20
	const points = generatePoints(parliament, radius)
	const a = points[0].r / 0.4
	const elements = points.map(pointToSVG)
	if (seatCount) {
		elements.push(svg('text', {
			x: 0,
			y: 0,
			'text-anchor': 'middle',
			style: {
				'font-family': 'Helvetica',
				'font-size': 0.25 * radius + 'px'
			},
			class: 'seatNumber'
		}, elements.length))
	}
	const document = svg('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: [-radius - a / 2, -radius - a / 2, 2 * radius + a, radius + a].join(',')
	}, elements)
	return document
}

module.exports = generate
