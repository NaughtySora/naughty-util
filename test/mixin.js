'use strict';
const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const { mixin } = require('../main');

describe("mixin", () => {
  it("weakAssign", () => {
    const target = { a: 1, b: 2, c: 3 };
    const mix = { a: 3, e: 33, test: 'Hello' };
    const result = mixin.weakAssign(target, mix);
    assert.equal(target, result);
    assert.deepEqual(target, { a: 1, b: 2, c: 3, e: 33, test: 'Hello' });
  });

  it("forget", () => {
    const target = { a: 1, b: 2, c: 3, e: 33, test: 'Hello' };
    const result = mixin.forget(target, ['test', 'a']);
    assert.equal(target, result);
    assert.deepEqual(target, { b: 2, c: 3, e: 33, });
  });
});
