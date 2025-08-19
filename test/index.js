'use strict';

// const paths = ['number', 'abstract', 'async',
//   'buffer', 'stream', 'array', 'mixin',
//   'date', 'http', 'misc', 'cache'];

const paths = ['abstract'];

for (const path of paths) require(`./${path}.js`);
