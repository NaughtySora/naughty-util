# Naughty Util
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/NaughtySora/naughty-util/blob/master/LICENSE)
[![snyk](https://snyk.io/test/github/NaughtySora/naughty-util/badge.svg)](https://snyk.io/test/github/NaughtySora/naughty-util)
[![npm version](https://badge.fury.io/js/naughty-util.svg)](https://badge.fury.io/js/naughty-util)
[![NPM Downloads](https://img.shields.io/npm/dm/naughty-util)](https://www.npmjs.com/package/naughty-util)
[![NPM Downloads](https://img.shields.io/npm/dt/naughty-util)](https://www.npmjs.com/package/naughty-util)

## Usage
- Install: `npm install naughty-util`
- Require: `const utils = require("naughty-util");`

## Examples

#### Promisify
```js
const fs = require("node:fs");
const { async } = require("naughty-util");
const readFile = async.promisify(fs.readFile);
const string = await readFile(__filename, "utf-8");
const buffer = await readFile(__filename);
```

#### Factorify
```js
const { abstract } = require("naughty-util");
const mapping = {
  discord: async () => {
    const res = await fetch(url, options);
    return res.image;
  },
  twitter: async () => {
    const res = await fetch(url, options);
    return res.profile.image.url;
  },
  twitch: async () => {
    const res = await fetch(url, options);
    return res.user_profile.icon;
  },
};
const DEFAULT_IMAGE = '...';
const strategies = abstract.factorify(mapping, async () => DEFAULT_IMAGE);
const img1 = await strategies("discord")();
const img2 = await strategies("linkedin")(); // default image
```

#### Enumerate
```js
const { iterator } = require("naughty-util");
const dataset = ["a", "b", "c", "d"];
for(const entry of iterator.enumerate(dataset)){
  entry[0] // value: "a"
  entry[1] // index: 0
}
```

### See tests for more

## Part of the naughty stack
