# Naughty Util
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/NaughtyySora/naughty-util/blob/master/LICENSE)

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
