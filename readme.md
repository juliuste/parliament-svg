# parliament-svg

Generate parliament charts as **[_hast_](https://github.com/syntax-tree/hast) virtual DOM SVG**. Design inspired by the [Wikipedia parliament charts](https://github.com/slashme/parliamentdiagram). *Play around with the [__live demo__](https://juliuste.github.io/parliament-svg/)!* For westminster-style parliament charts, see [westminster-svg](https://github.com/juliuste/westminster-svg). If you are using [D3](https://github.com/d3/d3/), you might prefer working with the [d3-parliament](https://github.com/geoffreybr/d3-parliament) module.

[![npm version](https://img.shields.io/npm/v/parliament-svg.svg)](https://www.npmjs.com/package/parliament-svg)
[![License](https://img.shields.io/github/license/juliuste/parliament-svg.svg?style=flat)](license)
[![Contact me](https://img.shields.io/badge/contact-email-turquoise)](mailto:mail@juliustens.eu)

## Installation

**This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): Node 12+ is needed to use it and it must be `import`ed instead of `require`d.**

```shell
npm install --save parliament-svg
```

## Usage

```js
import parliamentSVG from 'parliament-svg'

const virtualSvg = parliamentSVG(parties, seatCount)
```

- **`seatCount`** is a boolean, if `true` the total seat count will be displayed in the chart
- **`parties`** is an object containing seat count and colour for each party, e.g.:

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

For the given `parties` object and `seatCount` enabled, the rendered result should look like this:

![Example: German Bundestag with seat count enabled](https://rawgit.com/juliuste/parliament-svg/main/example/seatCount.svg)

If you want to convert the [_hast_](https://github.com/syntax-tree/hast) virtual DOM tree to an SVG string, use `hast-util-to-html` (don't get confused by the name, it can also stringify SVG):

```js
import parliamentSVG from 'parliament-svg'
import { toHtml as toSvg } from 'hast-util-to-html'

const virtualSvg = parliamentSVG(parties, seatCount)
const svg = toSvg(virtualSvg)
```

Check the [`example` directory](example) for further examples.

### What if I prefer virtual-dom?

If you prefer [`virtual-dom`](https://github.com/Matt-Esch/virtual-dom) over `hast`, e.g. for diffing or patching, you can use [`hast-to-hyperscript`](https://github.com/syntax-tree/hast-to-hyperscript).

## See also

- [westminster-svg](https://github.com/juliuste/westminster-svg) - "westminster-style parliament charts"
- [d3-parliament](https://github.com/geoffreybr/d3-parliament) - "parliament charts for [D3](https://github.com/d3/d3/)"
- [wikidata-parliament-svg](https://github.com/k-nut/wikidata-parliament-svg) - "draws parliament graphs based on data from wikidata"

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/parliament-svg/issues).
