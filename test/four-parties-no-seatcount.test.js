const parliamentSVG = require('../index');
const test = require('tape');

// "snapshot" of the expected output
const expected = require('./data/four-parties-no-seatcount');

const parliament = {
	"party1": {
		"seats":1,
		"colour": "#000"
	},
	"party2": {
		"seats":1,
		"colour": "#fff"
	},
	"party3": {
		"seats":1,
		"colour": "#abc"
	},
	"party4": {
		"seats":1,
		"colour": "#def"
	}
}

const seatCount = false;

// generate the virtual-dom SVG
const vDomSVG = parliamentSVG(parliament, seatCount);

// Compare the two objects
test('Four parties with 1 seat each, seatCount false', (assert) => {
	assert.deepEqual(vDomSVG, expected, 'Generated virtual dom SVG and expected output are the same');
	assert.end();
});