# parliament-svg

Generate parliament charts as **[virtual-dom](https://github.com/Matt-Esch/virtual-dom#virtual-dom) SVG**. Design inspired by the [Wikipedia parliament charts](https://github.com/slashme/parliamentdiagram). *Play around with the [__live demo__](https://juliuste.github.io/parliament-svg/)!* For westminster-style parliament charts, see [westminster-svg](https://github.com/juliuste/westminster-svg). If you are using [D3](https://github.com/d3/d3/), you might prefer working with the [d3-parliament](https://github.com/geoffreybr/d3-parliament) module.

[![npm version](https://img.shields.io/npm/v/parliament-svg.svg)](https://www.npmjs.com/package/parliament-svg)
[![Build Status](https://travis-ci.org/juliuste/parliament-svg.svg?branch=master)](https://travis-ci.org/juliuste/parliament-svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/parliament-svg.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/parliament-svg.svg)](https://david-dm.org/juliuste/parliament-svg)
[![license](https://img.shields.io/github/license/juliuste/parliament-svg.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install --save parliament-svg
```

## Usage

```js
const parliamentSVG = require('parliament-svg')

const svg = parliamentSVG(parties, seatCount)
```

- **`parties`** is an object containing seat count and colour for each party

```json
{
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
```
Each seat contains the party name in its `class` attribute.

- **`seatCount`** is a boolean, if `true` the total seat count will be displayed in the chart

For the given `parties` object and `seatCount` enabled, the rendered result should look like this:

![Example: German Bundestag with seat count enabled](https://rawgit.com/juliuste/parliament-svg/master/example/seatCount.svg)

If you want to convert the virtual DOM tree to HTML/SVG string, use `virtual-dom-stringify`:

```js
const toStr = require('virtual-dom-stringify')
const svg = toStr(svg)
```

## See also

- [westminster-svg](https://github.com/juliuste/westminster-svg) - "westminster-style parliament charts"
- [d3-parliament](https://github.com/geoffreybr/d3-parliament) - "parliament charts for [D3](https://github.com/d3/d3/)"
- [wikidata-parliament-svg](https://github.com/k-nut/wikidata-parliament-svg) - "draws parliament graphs based on data from wikidata"

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/parliament-svg/issues).
