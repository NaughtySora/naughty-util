'use strict';
const assert = require('node:assert');
const { describe, it } = require('node:test');
const { misc, async } = require('../main');

describe("misc", async () => {
  it("id", () => {
    const v = 42;
    assert.strictEqual(misc.id(v), v);
  });

  it("inRange", () => {
    const mock = [[2, 2, 4], [-25, 0, 25], ['g', 'a', 'm'], ['C', 'A', 'Z'], ['z', 'a', 'g']];
    const expected = [true, false, true, true, false];
    for (let i = 0; i < mock.length; i++) {
      const actual = misc.inRange(...mock[i]);
      assert.deepStrictEqual(actual, expected[i]);
    }
  });

  it("compose", () => {
    const mock = [
      [() => 13, x => x ** 2, x => x / 2, x => String(x)],
      [(s, delimiter) => `${delimiter}${s}${delimiter}`, (s) => s.length, length => length / 2]
    ];
    const params = [[undefined], ['Hello', '---']]
    const expected = ['84.5', 5.5];

    for (let i = 0; i < mock.length; i++) {
      const fn = misc.compose(...mock[i]);
      const actual = fn(...params[i]);
      assert.deepStrictEqual(actual, expected[i]);
    }
  });

  it("range", () => {
    assert.deepStrictEqual([...misc.range(10)], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.deepStrictEqual([...misc.range(10, -6, 2)], [-6, -4, -2, 0, 2, 4, 6, 8, 10]);
    assert.deepStrictEqual([...misc.range(10, 6, 2)], [6, 8, 10]);
  });

  it("partial", () => {
    const fn = (param1, param2, param3) => [param1, param2, param3];
    const fn2 = (...params) => params;
    const carried = misc.partial(fn, 1, 2);
    const carried2 = misc.partial(fn, 'h', 'e', 'llo');
    const carried3 = misc.partial(fn2, 1, 2);
    const carried4 = misc.partial(fn2, 'h', 'e', 'llo');
    assert.deepStrictEqual(carried(3), [1, 2, 3]);
    assert.deepStrictEqual(carried2(), ['h', 'e', 'llo']);
    assert.deepStrictEqual(carried3(3), [1, 2, 3]);
    assert.deepStrictEqual(carried4(), ['h', 'e', 'llo']);
  });

  it("projection", () => {
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
    assert.deepStrictEqual(result, {
      name: 'JOHN DOE',
      city: 'Washington',
      street: 'Street',
      __sex: false,
      planeNumber: '123213213'
    });
  });

  it("random", () => {
    {
      let count = 1e6;
      while (count-- !== 0) {
        const v = misc.random(10);
        assert.ok(misc.inRange(v, 0, 10));
      }
    }
    {
      let count = 1e6;
      while (count-- !== 0) {
        const v = misc.random(10, 5);
        assert.ok(misc.inRange(v, 5, 10));
      }
    }
  });

  await it("timestamp", async () => {
    const WAIT = 1000;
    const t = misc.timestamp();
    await async.pause(WAIT);
    const res = t();
    assert.ok(typeof res.nanoseconds === "bigint");
    assert.ok(typeof res.seconds === "number");
    assert.ok(res.seconds >= WAIT);
    assert.ok(res.nanoseconds >= BigInt(WAIT * 1e6));
  });

  it("unique", () => {
    const str = misc.unique();
    assert.ok(typeof str === "string");
    assert.ok(str.length > 0);
  });

  it("enumerate", () => {
    const arr = [{ a: 1 }, { b: 2 }, { c: 42 }];
    for (const { 0: item, 1: i } of misc.enumerate(arr)) {
      assert.deepStrictEqual(item, arr[i]);
    }
    const STEP = 10;
    for (const { 0: item, 1: i } of misc.enumerate(misc.range(100, 0, STEP))) {
      assert.strictEqual(i, item / STEP);
    }
  });
});
