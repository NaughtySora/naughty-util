'use strict';

const paths = ['abstract', 'adapters', 'array',
  'async', 'buffer', 'cache', 'date', 'error',
  'http', 'misc', 'mixin', 'number', 'palette', 
  'reflection', 'stream'];

for (const path of paths) require(`./${path}.js`);

