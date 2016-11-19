'use strict'

const svg = require('virtual-hyperscript-svg')
const roundTo = require('round-precision')
const sl = require('sainte-lague')

const pi = Math.PI

const round = (x) => roundTo(x, 10)
const seatSum = (o) => {
	let result = 0
	for(let key in o) result+=o[key].seats
	return result
}
const merge = (arrays) => {
	let result = []
	for(let list of arrays) result = result.concat(list)
	return result
}

const coords = (r, b) => ({
	x: round(r * Math.cos(b/r - pi)),
	y: round(r * Math.sin(b/r - pi))
})

const findA = (m, n, r) => {
	const x = (pi*n*r)/(m-n)
	const y = 1+(pi*(n-1)*n/2)/(m-n)

	const a = x/y
	return a
}

const score = (m, n, r) => Math.abs(findA(m, n, r)*n/r-(5/7))

const findN = (m, r) => {
	let n = Math.floor(Math.log(m)/Math.log(2)) || 1
	let a = findA(m, n, r)
	let distance = score(m, n, r)
	
	let direction = 0
	if(score(m, n+1, r)<distance) direction = 1
	if(score(m, n-1, r)<distance && n>1) direction = -1

	while(score(m, n+direction, r)<distance&&n>0){
		distance = score(m, n+direction, r)
		n+=direction
	}
	return n
}

const nextRing = (rings, ringProgress) => {
	let progressQuota, tQuota
	for(let index in rings){
		tQuota = round((ringProgress[index] || 0)/rings[index].length)
		if(!progressQuota || tQuota<progressQuota) progressQuota = tQuota
	}
	for(let index in rings){
		tQuota = round((ringProgress[index] || 0)/rings[index].length)
		if(tQuota==progressQuota) return index
	}
}

const generatePoints = (parliament, r0) => {

	// calculate seat count
	const m = seatSum(parliament)
	
	// calculate number of rings
	const n = findN(m, r0)
	// calculate seat distance
	const a0 = findA(m, n, r0)

	// calculate ring radii
	let rings = []
	for(let i=1; i<=n; i++){
		rings[i] = r0 - (i-1)*a0
	}

	// calculate seats per ring
	// todo: float to int
	rings = sl(rings, m)

	const points = []
	let r, a, point

	// build seats
	// loop rings
	let ring
	for(let i=1; i<=n; i++){
		ring = []
		// calculate ring-specific radius
		r = r0 - (i-1)*a0
		// calculate ring-specific distance
		a = (pi*r) / ((rings[i]-1) || 1)

		// loop points
		for(let j=0; j<=rings[i]-1; j++){
			point = coords(r, j*a)
			point.r = 0.4*a0
			ring.push(point)
		}
		points.push(ring)
	}

	// fill seats
	let initial = true
	const ringProgress = Array(points.length).fill(0)
	for(let party in parliament){
		for(let i=0; i<parliament[party].seats; i++){
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
	const a = points[0].r/0.4
	const elements = points.map(pointToSVG)
	if(seatCount){
		elements.push(svg('text', {
			x: 0,
			y: 0,
			"text-anchor": 'middle',
			style: {
				'font-family': 'Helvetica',
				'font-size': 0.25*radius+'px'
			},
			class: 'seatNumber'
		}, elements.length))
	}
	const document = svg('svg', {
		viewBox: [-radius-a/2, -radius-a/2, 2*radius+a, radius+a].join(',')
	}, elements)
	return document
}

module.exports = generate