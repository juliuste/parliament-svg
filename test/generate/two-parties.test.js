const parliamentSVG = require('../../index.js');
const test = require('tape');

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

const seatCount = false;

// generate the virtual-dom SVG
const vDomSVG = parliamentSVG(parliament, seatCount);

// "snapshot" of the expected output
const expected = {
    tagName: 'svg',
    properties: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: undefined,
        namespace: undefined,
        attributes: {
            viewBox: '-51.41592653589793,-51.41592653589793,102.83185307179586,82.83185307179586'
        }
    },
    children: [
		{
            tagName: 'circle',
            properties: {
				cx: undefined,
				cy: undefined,
				r: undefined,
				fill: undefined,
				class: undefined,
				namespace: undefined,
				attributes: {
					cx: -20,
					cy: -0,
					r: 25.132741228718345,
					fill: '#000',
					class: 'party1'
				}
			},
            children: [],
            key: undefined,
            namespace: 'http://www.w3.org/2000/svg',
            count: 0,
            hasWidgets: false,
            hasThunks: false,
            hooks: undefined,
            descendantHooks: false
        },
        {
            tagName: 'circle',
            properties: {
				cx: undefined,
				cy: undefined,
				r: undefined,
				fill: undefined,
				class: undefined,
				namespace: undefined,
				attributes: {
					cx: 20,
					cy: 0,
					r: 25.132741228718345,
					fill: '#fff',
					class: 'party2'
				}
			},
            children: [],
            key: undefined,
            namespace: 'http://www.w3.org/2000/svg',
            count: 0,
            hasWidgets: false,
            hasThunks: false,
            hooks: undefined,
            descendantHooks: false
        }
    ],
    key: undefined,
    namespace: 'http://www.w3.org/2000/svg',
    count: 2,
    hasWidgets: false,
    hasThunks: false,
    hooks: undefined,
    descendantHooks: false
};

// Compare the two objects
test('Two parties with 1 seat each, seatCount false', (assert) => {
	assert.deepEqual(vDomSVG, expected, 'Generated virtual dom SVG and expected output are the same');
	assert.end();
});