# Naughty Util
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/NaughtyySora/naughty-util/blob/master/LICENSE)
[![snyk](https://snyk.io/test/github/NaughtyySora/naughty-util/badge.svg)](https://snyk.io/test/github/NaughtyySora/naughty-util)
[![npm version](https://badge.fury.io/js/naughty-util.svg)](https://badge.fury.io/js/naughty-util)
[![NPM Downloads](https://img.shields.io/npm/dm/naughty-util)](https://www.npmjs.com/package/naughty-util)
[![NPM Downloads](https://img.shields.io/npm/dt/naughty-util)](https://www.npmjs.com/package/naughty-util)
## Import utils for your project

```js
const { async } = require("naughty-util");
const fs = require("node:fs");

try {
  const content = await async.thenable(fs.readFile, __filename, "utf-8");
  console.log(content);
} catch(err) {
  console.log(err);
}
```

```js
const { number } = require("naughty-util");

const result = number.total([1,2,3,4,5]);
console.log(result); //15
```

```js
const { misc } = require("naughty-util");

for(const i of range(10)){
  console.log(i);
}
```

## part of naughty stack
