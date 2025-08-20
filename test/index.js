'use strict';

const paths = ['abstract', 'adapters', 'array',
  'async', 'buffer', 'cache', 'date', 'error',
  'http', 'misc', 'mixin'];

for (const path of paths) require(`./${path}.js`);

