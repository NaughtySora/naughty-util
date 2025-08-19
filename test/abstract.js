'use strict';

const { abstract } = require('../main.js');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('abstract', () => {
  it('factorify', () => {
    const dataset = {
      sum: (a, b) => a + b,
      multi: (a, b) => a * b,
      pow: (base, power) => base ** power,
    };
    const math = abstract.factorify(dataset, dataset.pow);
    const sum = math('sum');
    const multi = math('multi');
    const pow = math('pow');
    const test = math('a');
    const actualSum = sum(1, 2);
    const actualMulti = multi(1, 2);
    const actualPow = pow(2, 3);
    const actualTest = test(2, 3);

    assert.strictEqual(sum, dataset.sum);
    assert.strictEqual(multi, dataset.multi);
    assert.strictEqual(pow, dataset.pow);
    assert.strictEqual(test, dataset.pow);

    assert.strictEqual(actualSum, 3);
    assert.strictEqual(actualMulti, 2);
    assert.strictEqual(actualPow, 8);
    assert.strictEqual(actualTest, 8);
  });

  it('factory', () => {
    class Pool {
      constructor(items) { this.items = items.slice(0); }
      get() { return this.items.shift(); }
    }
    const DATES = ['2024-12-11'];
    const DATA = { data: 'Hello' };
    const ARRAY_LENGTH = 3;
    const date = abstract.factory(Date, DATES[0]);
    const array = abstract.factory(Array, ARRAY_LENGTH);
    const pool = abstract.factory(Pool, [DATA]);
    const poolImpl = pool();

    assert.strictEqual(date().toString(), new Date(DATES[0]).toString());
    assert.deepStrictEqual(array().fill(1), [1, 1, 1]);
    assert.strictEqual(array().length, ARRAY_LENGTH);
    assert.deepStrictEqual(poolImpl.get(), DATA);
    assert.strictEqual(poolImpl.get(), undefined);
    assert.deepStrictEqual(pool().get(), DATA);
    assert.throws(() => {
      const pool = abstract.factory(Pool, null);
      pool();
    }, { message: "Cannot read properties of null (reading 'slice')" });
  });

  it('Options', () => {
    const str = "test";
    const option = new abstract.Option(str);
    assert.strictEqual(option.unwrap(), str);
    assert.strictEqual(option.valueOf(), "Some");

    const none = new abstract.Option();
    assert.strictEqual(none.unwrap(), undefined);
    assert.strictEqual(none.valueOf(), "None");
  });

  it('Result', () => {
    const str = "test";
    const result = new abstract.Result(str);
    assert.strictEqual(result.unwrap(), str);
    assert.strictEqual(result.valueOf(), "Ok");

    const nothing = new abstract.Result();
    assert.strictEqual(nothing.unwrap(), undefined);
    assert.strictEqual(nothing.valueOf(), "Ok");

    const error = new TypeError("a");
    const err = new abstract.Result(error);
    assert.deepStrictEqual(err.unwrap(), error);
    assert.strictEqual(err.valueOf(), "Err");
  });

  it('match', () => {
    const str = "test";
    const error = new Error(str);
    const result = new abstract.Result(str);
    const err = new abstract.Result(error);

    abstract.match(result, {
      "Ok": (v) => assert.strictEqual(v, str),
      "Err": () => { throw new Error("Should never reach") },
    });

    abstract.match(err, {
      "Ok": () => { throw new Error("Should never reach") },
      "Err": (e) => assert.deepStrictEqual(e, error),
    });

    const custom = {
      value: 42,
      unwrap() {
        return custom.value;
      },
      valueOf() {
        return "test";
      },
    };

    const custom2 = {
      value: 42,
      unwrap() {
        return custom.value;
      },
      valueOf() {
        return "key";
      },
    };

    abstract.match(custom, {
      "test": (v) => assert.strictEqual(v, custom.value),
      _: () => { throw new Error("Should never reach") },
    });

    abstract.match(custom, {
      _: (v) => assert.strictEqual(v, custom.value),
    });

    abstract.match(custom2, {
      "test": () => { throw new Error("Should never reach") },
      _: (v) => assert.strictEqual(v, custom.value),
    });

    const data = {};
    const error2 = new Error("test");
    const some = new abstract.Option(data);
    const some2 = new abstract.Option(error2);
    const none = new abstract.Option();
    const none2 = new abstract.Option(null);

    abstract.match(some, {
      "Some": (v) => assert.deepStrictEqual(v, data),
      "None": () => { throw new Error("Should never reach") },
    });

    abstract.match(some2, {
      "Some": (v) => assert.deepStrictEqual(v, error2),
      "None": () => { throw new Error("Should never reach") },
    });

    abstract.match(none, {
      "Some": () => { throw new Error("Should never reach") },
      "None": (v) => assert.strictEqual(v, undefined),
    });

    abstract.match(none2, {
      "Some": () => { throw new Error("Should never reach") },
      "None": (v) => assert.strictEqual(v, undefined),
    });
  });
});