const parliamentSVG = require('../index');
const test = require('tape');

// "snapshot" of the expected output
const expected = require('./data/bundestag-2013-seatcount');

const parliament = {
	"linke": {
		"seats": 64,
		"colour": "#a08"
	},
	"spd": {
		"seats": 193,
		"colour": "#e02"
	},
	"gruene": {
		"seats": 63,
		"colour": "#0b2"
	},
	"union": {
		"seats": 311,
		"colour": "#333"
	}
}

const seatCount = true;

// generate the virtual-dom SVG
const vDomSVG = parliamentSVG(parliament, seatCount);

// Compare the two objects
test('Bundestag federal election results from 2013, seatCount true', (assert) => {
	assert.deepEqual(vDomSVG, expected, 'Generated virtual dom SVG and expected output are the same');
	assert.end();
});