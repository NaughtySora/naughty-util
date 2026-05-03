'use strict';

const { readdirSync, lstatSync } = require('node:fs');
const { resolve } = require('node:path');

const paths = readdirSync(__dirname);

for (const path of paths) {
  const pathname = resolve(__dirname, path);
  if (lstatSync(pathname).isDirectory()) continue;
  require(pathname);
}
