'use strict';

const assert = require('node:assert');
const { describe, it } = require('node:test');
const { cache, misc, async } = require('../main');

describe("cache", async () => {
  it("set/get", () => {
    const store = cache();

    const mocks = [
      { a: 1, b: 2 },
      [1, 2, 3],
      'Hello World!',
      Math.random(),
      JSON.stringify({ json: 123123213213 }),
      Buffer.from('Some important text'),
    ];

    for (const mock of mocks) {
      const index = mocks.indexOf(mock);
      const key = `test-${index}`;
      store(key, mock);
      const val = store.get(key);
      assert.strictEqual(val, mock);
    }
    store[Symbol.dispose]();
  });

  await it("timeout", async () => {
    const store = cache({ ms: 1000 });
    store("test", 42);
    assert.strictEqual(store.get("test"), 42);
    await async.pause(1000);
    assert.strictEqual(store.get("test"), undefined);
    store[Symbol.dispose]();
  });

  it("timeout/change", () => {
    const store = cache({ ms: 1000 });
    assert.strictEqual(store.ms, 1000);
    store.timeout(5000);
    assert.strictEqual(store.ms, 5000);
    store[Symbol.dispose]();
  });

  it("max", () => {
    const store = cache({ max: 3 });
    store(1, 1);
    assert.strictEqual(store.get(1), 1);
    store(2, 1);
    assert.strictEqual(store.get(2), 1);
    store(3, 1);
    assert.strictEqual(store.get(3), 1);
    store(4, 1);
    assert.strictEqual(store.get(4), 1);
    store(5, 1);
    assert.strictEqual(store.get(5), 1);

    assert.strictEqual(store.get(1), undefined);
    assert.strictEqual(store.get(2), undefined);
    store[Symbol.dispose]();
  });

  it("max/change", () => {
    const store = cache({ max: 3 });
    for (const i of misc.range(25)) {
      if (i === 5) {
        store.limit(5);
        assert.strictEqual(store.max, 5);
      }
      store(i, i);
      if (misc.inRange(i, 5, 10)) assert.ok(misc.inRange(store.storage.size, 2, 5));
      if (i === 10) {
        store.limit(1);
        assert.strictEqual(store.max, 1);
      }
      if (misc.inRange(i, 11, 25)) assert.ok(misc.inRange(store.storage.size, 1, 1));
    }
    store[Symbol.dispose]();
  });

  describe("dispose", () => {
    it("[Symbol.dispose]", () => {
      const store = cache({ max: 3, timeout: 1000 });
      store("test", 42);
      assert.strictEqual(store.get("test"), 42);
      store[Symbol.dispose]();
      assert.strictEqual(store.get("test"), undefined);
      assert.strictEqual(store.storage.size, 0);
      assert.strictEqual(store.max, Infinity);
      assert.strictEqual(store.ms, Infinity);
    });

    it("using Node >= 24", () => {
      let s = null;
      {
        using store = cache({ max: 3, timeout: 1000 });
        store("test", 42);
        s = store;
      }
      assert.strictEqual(s.get("test"), undefined);
      assert.strictEqual(s.storage.size, 0);
      assert.strictEqual(s.max, Infinity);
      assert.strictEqual(s.ms, Infinity);
    });
  });
});
