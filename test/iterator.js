'use strict';

const { iterator } = require('../main');
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

function* gen() {
  let i = 0;
  while (i-- === 0) yield i;
}

describe('iterator', () => {
  describe('limit', () => {
    it('valid', () => {
      const seq = [1, 2, 3, 4, 5];
      assert.deepEqual([...iterator.limit(seq, 3)], [1, 2, 3]);
    });

    it('negative limit', () => {
      assert.deepEqual([...iterator.limit(gen(), -1)], []);
    });
  });

  it('pick', () => {
    it('valid', () => {
      const seq = [
        { name: 'test', age: 42 },
        { name: 'test-2', age: 420 },
      ];
      assert.deepEqual([...iterator.pick(seq, 'age')], [42, 420]);
    });
  });
});
