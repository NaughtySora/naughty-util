"use strict";
const assert = require("node:assert");
const test = require("./framework.js");
const { array } = require("../main");

const valid = () => {
  const mock = [{ a: 1 }, 1, Boolean, true, "123", [1, 2, 3], new Map(), new Set(), []];
  const expected = [false, false, false, false, false, true, false, false, false];
  for (let i = 0; i < mock.length; i++) {
    const actual = array.valid(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const accessor = () => {
  const data = ["John Doe", "USA, California, 0000, huge funding street, 3d", "some data", "2024-12-11", "Honda Civic", 33];
  const car = Symbol("car");
  const meta = { name: 0, address: 1, age: 5, [car]: 4 };
  const result = array.accessor(data, meta);
  assert.strictEqual(result.name, data[0]);
  assert.strictEqual(result.address, data[1]);
  assert.strictEqual(result[car], data[4]);
  assert.strictEqual(result.age, data[5]);
  assert.strictEqual(result[0], data[0]);
  assert.strictEqual(result[1], data[1]);
  assert.strictEqual(result[4], data[4]);
  assert.strictEqual(result[5], data[5]);
  assert.deepEqual(result, data);
};

test.sync([valid, accessor], "array");