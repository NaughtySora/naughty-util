'use strict';

const { reflection, misc } = require('../main');
const { describe, it } = require('node:test');
const assert = require('node:assert');

const TESTS = [
  "",
  1,
  true,
  false,
  1n,
  {},
  [],
  new Set(),
  new Map(),
  () => { },
  async () => { },
  Symbol(),
  undefined,
  null,
  class T { },
  function A() { },
  new RegExp(),
  Atomics,
  String,
  new String("?"),
  new Error("hi"),
  -0,
  +0,
  0,
  0n,
  NaN,
];

const ASYNC_FN = 10;
const CLASS = 14;
const ERROR = 20;
const COMPLEX = [5, 6, 7, 8, 9, ASYNC_FN, CLASS, 15, 16, 17, 18, 19, ERROR];
const EMPTY = [12, 13];
const FALSY = [0, 3, 12, 13, 21, 22, 23, 24, 25];
const OBJECT = [5, 7, 8, 16, 17, 19, 20];
const PRIMITIVES = [0, 1, 2, 3, 4, 11, 12, 21, 22, 23, 24, 25];

describe("reflection", () => {
  it('isAsyncFunction', () => {
    for (const [t, i] of misc.enumerate(TESTS)) {
      if (i === ASYNC_FN) {
        assert.strictEqual(reflection.isAsyncFunction(t), true);
        continue;
      }
      assert.strictEqual(reflection.isAsyncFunction(t), false);
    }
  });
  it('isClass', () => {
    for (const [t, i] of misc.enumerate(TESTS)) {
      if (i === CLASS) {
        assert.strictEqual(reflection.isClass(t), true);
        continue;
      }
      assert.strictEqual(reflection.isClass(t), false);
    }
  });
  it('isComplex', () => {
    for (const [t, i] of misc.enumerate(TESTS)) {
      if (COMPLEX.includes(i)) {
        assert.strictEqual(reflection.isComplex(t), true);
        continue;
      }
      assert.strictEqual(reflection.isComplex(t), false);
    }
  });
  it('isEmpty', () => {
    for (const [t, i] of misc.enumerate(TESTS)) {
      if (EMPTY.includes(i)) {
        assert.strictEqual(reflection.isEmpty(t), true);
        continue;
      }
      assert.strictEqual(reflection.isEmpty(t), false);
    }
  });
  it('isError', () => {
    for (const [t, i] of misc.enumerate(TESTS)) {
      if (i === ERROR) {
        assert.strictEqual(reflection.isError(t), true);
        continue;
      }
      assert.strictEqual(reflection.isError(t), false);
    }
  });
  it('isFalsy', () => {
    for (const [t, i] of misc.enumerate(TESTS)) {
      if (FALSY.includes(i)) {
        assert.strictEqual(reflection.isFalsy(t), true);
        continue;
      }
      assert.strictEqual(reflection.isFalsy(t), false);
    }
  });
  it('isObject', () => {
    for (const [t, i] of misc.enumerate(TESTS)) {
      if (OBJECT.includes(i)) {
        assert.strictEqual(reflection.isObject(t), true);
        continue;
      }
      assert.strictEqual(reflection.isObject(t), false);
    }
  });
  it('isPrimitive', () => {
    for (const [t, i] of misc.enumerate(TESTS)) {
      if (PRIMITIVES.includes(i)) {
        assert.strictEqual(reflection.isPrimitive(t), true);
        continue;
      }
      assert.strictEqual(reflection.isPrimitive(t), false);
    }
  });
});
