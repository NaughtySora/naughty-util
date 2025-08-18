'use strict';
const assert = require('node:assert');
const test = require('./framework.js');
const { cache, misc } = require('../main');

const cacheTest = () => {
  const store = cache({ max: 3, ms: 5000 });
  const mocks = [
    { a: 1, b: 2 },
    [1, 2, 3],
    'Hello World!',
    Math.random(),
    JSON.stringify({ json: 123123213213 }),
    Buffer.from('Some important text')
  ];

  for (const mock of mocks) {
    const index = mocks.indexOf(mock);
    const key = `test-${index}`;
    store(key, mocks[index]);
    const val = store.get(key);
    assert.strictEqual(val, mocks[index]);
  }
  
  assert.strictEqual(store.ms, 5000);
  store.timeout(1000);
  assert.strictEqual(store.ms, 1000);

  const store2 = cache({ max: 1 });
  for (const i of misc.range(25)) {
    if (i === 5) {
      store2.limit(5);
      assert.strictEqual(store2.max, 5);
    }
    store2(i, i);
    if (misc.inRange(i, 5, 10)) assert.ok(misc.inRange(store2.storage.size, 2, 5));
    if (i === 10) {
      store2.limit(1);
      assert.strictEqual(store2.max, 1);
    }
    if (misc.inRange(i, 11, 25)) assert.ok(misc.inRange(store2.storage.size, 1, 1));
  }
};

test.sync([cacheTest], 'cache');