'use strict';

const assert = require('node:assert');
const test = require('./framework.js');
const { abstract } = require('../main');

const dataset = {
  sum: (a, b) => a + b,
  multi: (a, b) => a * b,
  pow: (base, power) => base ** power,
};

class TestPool {
  constructor(smth) {
    this.items = [smth];
  }

  get() {
    return this.items.shift();
  }
}
const DATES = ['2024-12-11'];
const DATA = { data: 'Hello' };

const factorify = () => {
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
};

const factory = () => {
  const date = abstract.factory(Date, DATES[0]);
  const array = abstract.factory(Array, 3);
  const pool = abstract.factory(TestPool, DATA);

  assert.strictEqual(date().toString(), new Date(DATES[0]).toString());
  assert.deepEqual(array().fill(1), [1, 1, 1]);
  assert.deepEqual(pool().get(), DATA);
  assert.deepEqual(pool().get(), DATA);
};

test.sync([factorify, factory], 'abstract');