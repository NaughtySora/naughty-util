'use strict';
const assert = require('node:assert');
const test = require('./framework.js');
const { number } = require('../main');

const average = () => {
  const mock = [22, 42, 512, 69, 33];
  const zero = [0, 10, -10];
  const negative = [-1.5, -2.5, 1];
  const actual = number.average(mock);
  const actualZero = number.average(zero);
  const actualNegative = number.average(negative);
  const expected = 135.6;
  const negativeExpected = -1;
  assert.deepEqual(actual, expected);
  assert.deepEqual(actualZero, 0);
  assert.deepEqual(actualNegative, negativeExpected);
};

const total = () => {
  const mock = [85, 100, 53, 92, 10, 1.25, -10];
  const zero = [0, 5, -3.5, -1.5];
  const negative = [-1.5, -2.5, 1];
  const actual = number.total(mock);
  const actualZero = number.total(zero);
  const actualNegative = number.total(negative);
  const expected = 331.25;
  const negativeExpected = -3;
  assert.deepEqual(actual, expected);
  assert.deepEqual(actualZero, 0);
  assert.deepEqual(actualNegative, negativeExpected);
};

const cutFraction = () => {
  const mock = [123.123123, 101.15, -25.5558123, 0.3333333333, 9.09461, Math.PI, Math.E];
  const expected = [123.12, 101.15, -25.56, 0.33, 9.09, 3.14, 2.71];
  for (let i = 0; i < mock.length; i++) {
    const actual = number.cutFraction(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const positiveInt = () => {
  const mock = [0, -0, -10, 10, 245, 22.22, 33.45, -26.99, Infinity, -Infinity, NaN, {}, 'a'];
  const expected = [true, true, false, true, true, false, false, false, false, false, false, false, false];
  for (let i = 0; i < mock.length; i++) {
    const actual = number.positiveInt(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const safe = () => {
  const mock = [0, -0, -10, 10, 245, 22.22, 33.45, -26.99, Infinity, -Infinity, NaN, 'a', {}];
  const expected = [0, 0, -10, 10, 245, 22.22, 33.45, -26.99, 0, 0, 0, 0, 0];
  for (let i = 0; i < mock.length; i++) {
    const actual = number.safe(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const isSafe = () => {
  const mock = [0, -0, -10, 10, 245, 22.22, 33.45, -26.99, Infinity, -Infinity, NaN, 'a', {}];
  const expected = [true, true, true, true, true, true, true, true, false, false, false, false, false];
  for (let i = 0; i < mock.length; i++) {
    const actual = number.isSafe(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const percentRatio = () => {
  const mocks = [
    [500, 25],
    [0, 10],
    [10, 0],
    [0, 0],
    [NaN, '3'],
    [NaN, NaN],
    ['asd', 'test'],
    [{}, { baz: 1 }],
    [25, 25],
    [33, 100],
    [100, 10],
    [200, 25]
  ];
  const expected = [5, 0, 0, 0, 0, 0, 0, 0, 100, 303.030303030303, 10, 12.5];
  for (const mock of mocks) {
    const index = mocks.indexOf(mock);
    const [amount, part] = mock;
    const percentOfTotal = number.percentRatio(amount, part);
    assert.strictEqual(percentOfTotal, expected[index]);
  }
};

const percentOf = () => {
  const mocks = [
    [500, 25],
    [0, 10],
    [10, 0],
    [0, 0],
    [NaN, '3'],
    [NaN, NaN],
    ['asd', 'test'],
    [{}, { baz: 1 }],
    [25, 25],
    [33, 100],
    [100, 10],
    [200, 25]
  ];
  const expected = [125, 0, 0, 0, 0, 0, 0, 0, 6.25, 33, 10, 50];
  for (const mock of mocks) {
    const index = mocks.indexOf(mock);
    const [total, part] = mock;
    const percentOfTotal = number.percentOf(total, part);
    assert.strictEqual(percentOfTotal, expected[index]);
  }
};

test.sync([average, total, cutFraction, positiveInt, safe, isSafe, percentRatio, percentOf], 'number');