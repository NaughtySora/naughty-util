'use strict';

const paths = ['abstract', 'adapters', 'array',
  'async', 'buffer', 'cache', 'date', 'error',
  'http', 'misc', 'mixin', 'number', 'palette',
  'reflection', 'stream', 'string', 'iterator'];

for (const path of paths) require(`./${path}.js`);

