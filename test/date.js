'use strict';
const assert = require('node:assert');
const { date } = require('../main');
const { describe, it } = require('node:test');

describe('date', () => {
  it("difference", () => {
    const later5000 = Date.now() + 5000;
    const earlier2500 = Date.now() - 2500;
    const now = new Date();
    const diff = date.difference(now, later5000);
    const diff2 = date.difference(now, earlier2500);
    const zero = date.difference(now, now);
    assert.strictEqual(diff, 5000);
    assert.strictEqual(diff2, -2500);
    assert.strictEqual(diff2, -2500);
    assert.strictEqual(zero, 0);
  });

  it('reached', () => {
    const later5000 = Date.now() + 5000;
    const earlier2500 = Date.now() - 2500;
    const now = new Date();
    const reached = date.reached(now, later5000);
    const reached2 = date.reached(now, earlier2500);
    const reached3 = date.reached(now, now);
    assert.strictEqual(reached, true);
    assert.strictEqual(reached2, false);
    assert.strictEqual(reached3, true);
  });

  it('unix', () => {
    const now = Date.now();
    const unix = date.unix(now);
    assert.strictEqual(String(unix).length, (String(now).length - 3));
    assert.strictEqual(unix, Math.floor(now / 1000));
  });

  it('verbal', () => {
    const time = date.verbal('2d 10s 20s 5m');
    const expected = (date.DAY * 2) + (30 * date.SECOND) + (5 * date.MINUTE);
    assert.strictEqual(time, expected);
  });

  it('verbalEpoch', () => {
    const now = Date.now();
    const time = date.verbalEpoch('2d 10s 20s 5m');
    const expected = ((date.DAY * 2) + (30 * date.SECOND) + (5 * date.MINUTE)) + now;
    assert.strictEqual(time, expected);
  });

  it('midnight', () => {
    const now = Date.now();
    const midnight = date.midnight(now);
    const expected = new Date().setHours(0, 0, 0, 0);
    assert.strictEqual(midnight, expected);
  });

  it('midnightUTC', () => {
    const now = Date.now();
    const midnight = date.midnightUTC(now);
    const expected = new Date().setUTCHours(0, 0, 0, 0);
    assert.strictEqual(midnight, expected);
  });
});