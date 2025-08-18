'use strict';
const assert = require('node:assert');
const test = require('./framework.js');
const { misc } = require('../main');

const inRange = () => {
  const mock = [[2, 2, 4], [-25, 0, 25], ['g', 'a', 'm'], ['C', 'A', 'Z'], ['z', 'a', 'g']];
  const expected = [true, false, true, true, false];
  for (let i = 0; i < mock.length; i++) {
    const actual = misc.inRange(...mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const compose = () => {
  const mock = [
    [() => 13, x => x ** 2, x => x / 2, x => String(x)],
    [(s, delimiter) => `${delimiter}${s}${delimiter}`, (s) => s.length, length => length / 2]
  ];
  const params = [[undefined], ['Hello', '---']]
  const expected = ['84.5', 5.5];

  for (let i = 0; i < mock.length; i++) {
    const fn = misc.compose(...mock[i]);
    const actual = fn(...params[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const range = () => {
  assert.deepEqual([...misc.range(10)], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual([...misc.range(10, -6, 2)], [-6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepEqual([...misc.range(10, 6, 2)], [6, 8, 10]);
};

const partial = () => {
  const fn = (param1, param2, param3) => [param1, param2, param3];
  const fn2 = (...params) => params;
  const carried = misc.partial(fn, 1, 2);
  const carried2 = misc.partial(fn, 'h', 'e', 'llo');
  const carried3 = misc.partial(fn2, 1, 2);
  const carried4 = misc.partial(fn2, 'h', 'e', 'llo');
  assert.deepEqual(carried(3), [1, 2, 3]);
  assert.deepEqual(carried2(), ['h', 'e', 'llo']);
  assert.deepEqual(carried3(3), [1, 2, 3]);
  assert.deepEqual(carried4(), ['h', 'e', 'llo']);
};

const projection = () => {
  const data = {
    name: 'John Doe',
    address: {
      city: 'Washington',
      country: 'USA',
      index: '0000',
      rest: 'Street, flat 00'
    },
    phone: 123456123,
    siblings: [{ name: 1 }, { name: 2 }],
    info: {
      sex: 0,
      flightHistory: [
        {
          plane: '123213213',
          pilot: 'Johnson Doe',
          seat: 42,
          luggage: {
            small: 1,
            big: 3
          }
        }
      ]
    }
  };
  const meta = [
    ['name', undefined, (x) => x.toUpperCase()],
    ['address', [
      ['city'], ['rest', 'street', x => x.split(',')[0]]
    ]],
    ['info', [
      ['sex', '__sex', x => Boolean(x)],
      ['flightHistory', 'planeNumber', x => x[0].plane]
    ]],
  ];

  const result = misc.projection(meta, data);
  assert.deepEqual(result, {
    name: 'JOHN DOE',
    city: 'Washington',
    street: 'Street',
    __sex: false,
    planeNumber: '123213213'
  });
};

// const r = misc.range(10, 0);
// for(const i of misc.enumerate(r)) console.log(i);

test.sync([inRange, compose, range, partial, projection], 'misc');
