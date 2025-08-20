'use strict';

const paths = ['abstract', 'adapters', 'array', 
  'async', 'buffer', 'cache', 'date', 'error'];

for (const path of paths) require(`./${path}.js`);

