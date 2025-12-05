'use strict';
const { array, misc } = require('../main');
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

describe("array", () => {
  it("valid", () => {
    const mock = [{ a: 1 }, 1, Boolean, true, '123', [1, 2, 3], new Map(), new Set(), []];
    const expected = [false, false, false, false, false, true, false, false, false];
    for (let i = 0; i < mock.length; i++) {
      const actual = array.valid(mock[i]);
      assert.equal(actual, expected[i]);
    }
  });

  it("accessor", () => {
    const data = [
      'John Doe',
      'USA, California, 0000, huge funding street, 3d',
      'some data',
      '2024-12-11',
      'Honda Civic',
      33
    ];
    const car = Symbol('car');
    const meta = { name: 0, address: 1, age: 5, [car]: 4 };
    const result = array.accessor(data, meta);
    assert.equal(result.name, data[0]);
    assert.equal(result.address, data[1]);
    assert.equal(result[car], data[4]);
    assert.equal(result.age, data[5]);
    assert.equal(result[0], data[0]);
    assert.equal(result[1], data[1]);
    assert.equal(result[4], data[4]);
    assert.equal(result[5], data[5]);
    result.address = 10;
    result[car] = '42';
    assert.equal(result.address, 10);
    assert.equal(result[car], '42');
    assert.deepEqual(result, data);
  });

  it("shuffle", () => {
    const test = [1, 2, "hello", { test: 42 }, () => { }];
    const length = test.length;
    const shuffled = array.shuffle(test);
    assert.equal(length, shuffled.length);
    assert.deepEqual(test, shuffled);
  });

  it("sample", () => {
    const test = [1, 2, "hello", { test: 42 }, () => { }];
    const length = test.length;
    assert.ok(test.includes(array.sample(test)));
    assert.ok(test.includes(array.sample(test)));
    assert.ok(test.includes(array.sample(test)));
    assert.equal(length, test.length);
  });

  describe("avg", () => {
    it("simple", () => {
      const test = [10, 6, 5];
      const avg = array.avg(test, misc.id);
      assert.equal(avg, 7);
    });

    it("nested", () => {
      const test = [{ value: 42 }, { value: 8 }];
      const avg = array.avg(test, item => item.value);
      assert.equal(avg, 25);
    });

    it("invalid", () => {
      const test = {};
      const avg = array.avg(test, item => item.value);
      assert.equal(avg, 0);
    });
  });

  describe("max", () => {
    it("simple", () => {
      const test = [10, 6, 5];
      const max = array.max(test, misc.id);
      assert.equal(max, 10);
    });

    it("nested", () => {
      const test = [{ value: 42 }, { value: 8 }];
      const max = array.max(test, item => item.value);
      assert.equal(max, 42);
    });

    it("invalid", () => {
      const test = {};
      const max = array.max(test, item => item.value);
      assert.equal(max, -Infinity);
    });
  });

  describe("min", () => {
    it("simple", () => {
      const test = [10, 6, 5];
      const min = array.min(test, misc.id);
      assert.equal(min, 5);
    });

    it("nested", () => {
      const test = [{ value: 42 }, { value: 8 }];
      const min = array.min(test, item => item.value);
      assert.equal(min, 8);
    });

    it("invalid", () => {
      const test = {};
      const min = array.min(test, item => item.value);
      assert.equal(min, Infinity);
    });
  });

  describe("sum", () => {
    it("simple", () => {
      const test = [10, 6, 5];
      const sum = array.sum(test, misc.id);
      assert.equal(sum, 21);
    });

    it("nested", () => {
      const test = [{ value: 42 }, { value: 8 }];
      const sum = array.sum(test, item => item.value);
      assert.equal(sum, 50);
    });

    it("invalid", () => {
      const test = {};
      const sum = array.sum(test, item => item.value);
      assert.equal(sum, 0);
    });
  });

  describe("swap", () => {
    const target = [1, 2, 3, 4];
    array.swap(target, 0, 3);
    assert.deepEqual(target, [4, 2, 3, 1]);
  });
});
