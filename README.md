# Naughty Util
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/NaughtyySora/naughty-util/blob/master/LICENSE)

## Import utils for your project

## Project is not published on npm! code below only use example for the future

```js
const {async} = require("naughty-util");
const fs = require("node:fs");

const main = async () => {
  const content = await async.thenable(fs.readFile, __filename, "utf-8");
  console.log(content);
};
main();
```
