'use strict'

const createElement = require('virtual-dom/create-element')
const diff = require('virtual-dom/diff')
const patch = require('virtual-dom/patch')

const patterns = require('..')

const data = document.querySelector('#demo-data')
const seats = document.querySelector('#demo-seats')

const render = () => patterns(JSON.parse(data.value), seats.checked)

let tree = render()
let root = createElement(tree)
document.querySelector('#demo-target').appendChild(root)

const rerender = () => {
	let tree2 = render()
	root = patch(root, diff(tree, tree2))
	tree = tree2
}
const callRerender = function() {
	return setTimeout(rerender, 5);
}

data.addEventListener('keydown', function(e) {
	//8 is the keycode for backspace
	if (e.keyCode==8) callRerender()
});
data.addEventListener('keypress', function () {
	callRerender()
});
seats.addEventListener('change', rerender)
