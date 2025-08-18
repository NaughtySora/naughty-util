'use strict';
const assert = require('node:assert');
const test = require('./framework.js');
const { buffer } = require('../main');

const random = async () => {
  const length = 32;
  const content = await buffer.random(length);
  assert.equal(Buffer.isBuffer(content), true);
  assert.equal(content.length, length);
};

test.async([random], 'buffer');