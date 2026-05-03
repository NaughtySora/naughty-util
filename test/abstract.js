'use strict';

const { abstract } = require('../main');
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

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

    assert.equal(sum, dataset.sum);
    assert.equal(multi, dataset.multi);
    assert.equal(pow, dataset.pow);
    assert.equal(test, dataset.pow);

    assert.equal(actualSum, 3);
    assert.equal(actualMulti, 2);
    assert.equal(actualPow, 8);
    assert.equal(actualTest, 8);
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

    assert.equal(date().toString(), new Date(DATES[0]).toString());
    assert.deepEqual(array().fill(1), [1, 1, 1]);
    assert.equal(array().length, ARRAY_LENGTH);
    assert.deepEqual(poolImpl.get(), DATA);
    assert.equal(poolImpl.get(), undefined);
    assert.deepEqual(pool().get(), DATA);
    assert.throws(() => {
      const pool = abstract.factory(Pool, null);
      pool();
    }, { message: "Cannot read properties of null (reading 'slice')" });
  });

  it('Options', () => {
    const str = "test";
    const some = new abstract.Option(str);
    assert.equal(some.unwrap(), str);
    assert.equal(some.valueOf(), "Some");

    const none = new abstract.Option();
    assert.equal(none.unwrap(), undefined);
    assert.equal(none.valueOf(), "None");

    const error = new Error("err");
    const value = [1, 2, 3];
    const some2 = abstract.Option.from(value);
    const some3 = abstract.Option.from(error);
    const none2 = abstract.Option.from();

    assert.deepEqual(some2.unwrap(), value);
    assert.deepEqual(some3.unwrap(), error);
    assert.equal(none2.unwrap(), undefined);

    assert.equal(some2.valueOf(), "Some");
    assert.equal(some3.valueOf(), "Some");
    assert.equal(none2.valueOf(), "None");
  });

  it('Result', () => {
    const str = "test";
    const result = new abstract.Result(str);
    assert.equal(result.unwrap(), str);
    assert.equal(result.valueOf(), "Ok");

    const nothing = new abstract.Result();
    assert.equal(nothing.unwrap(), undefined);
    assert.equal(nothing.valueOf(), "Ok");

    const error = new TypeError("a");
    const err = new abstract.Result(error);
    assert.deepEqual(err.unwrap(), error);
    assert.equal(err.valueOf(), "Err");

    const error2 = new Error("err");
    const value = [1, 2, 3];
    const res = abstract.Result.from(value);
    const empty = abstract.Result.from();
    const err2 = abstract.Result.from(error2);

    assert.deepEqual(res.unwrap(), value);
    assert.equal(empty.unwrap(), undefined);
    assert.deepEqual(err2.unwrap(), error2);

    assert.equal(res.valueOf(), "Ok");
    assert.equal(empty.valueOf(), "Ok");
    assert.equal(err2.valueOf(), "Err");
  });

  it('match', () => {
    const str = "test";
    const error = new Error(str);
    const result = new abstract.Result(str);
    const err = new abstract.Result(error);

    abstract.match(result, {
      "Ok": (v) => assert.equal(v, str),
      "Err": () => { throw new Error("Should never reach") },
    });

    abstract.match(err, {
      "Ok": () => { throw new Error("Should never reach") },
      "Err": (e) => assert.deepEqual(e, error),
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
      "test": (v) => assert.equal(v, custom.value),
      _: () => { throw new Error("Should never reach") },
    });

    abstract.match(custom, {
      _: (v) => assert.equal(v, custom.value),
    });

    abstract.match(custom2, {
      "test": () => { throw new Error("Should never reach") },
      _: (v) => assert.equal(v, custom.value),
    });

    const data = {};
    const error2 = new Error("test");
    const some = new abstract.Option(data);
    const some2 = new abstract.Option(error2);
    const none = new abstract.Option();
    const none2 = new abstract.Option(null);

    abstract.match(some, {
      "Some": (v) => assert.deepEqual(v, data),
      "None": () => { throw new Error("Should never reach") },
    });

    abstract.match(some2, {
      "Some": (v) => assert.deepEqual(v, error2),
      "None": () => { throw new Error("Should never reach") },
    });

    abstract.match(none, {
      "Some": () => { throw new Error("Should never reach") },
      "None": (v) => assert.equal(v, undefined),
    });

    abstract.match(none2, {
      "Some": () => { throw new Error("Should never reach") },
      "None": (v) => assert.equal(v, undefined),
    });

    assert.throws(() => {
      abstract.match(none2, {});
    }, { message: "Can't find matched strategy" });
  });
});
