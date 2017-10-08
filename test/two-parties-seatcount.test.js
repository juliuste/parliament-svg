const parliamentSVG = require('../index');
const test = require('tape');

// "snapshot" of the expected output
const expectedOutput = require('./data/two-parties-seatcount');

const parliament = {
	"party1": {
		"seats":1,
		"colour": "#000"
	},
	"party2": {
		"seats":1,
		"colour": "#fff"
	}
}

const seatCount = true;

// generate the virtual-dom SVG
const vDomSVG = parliamentSVG(parliament, seatCount);

// Compare the two objects
test('Two parties with 1 seat each, seatCount true', (assert) => {
	assert.deepEqual(vDomSVG, expectedOutput, 'Generated virtual dom SVG and expected output are the same');
	assert.end();
});