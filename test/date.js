'use strict';
const assert = require('node:assert/strict');
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
    assert.equal(diff, 5000);
    assert.equal(diff2, -2500);
    assert.equal(diff2, -2500);
    assert.equal(zero, 0);
  });

  it('reached', () => {
    const later5000 = Date.now() + 5000;
    const earlier2500 = Date.now() - 2500;
    const now = new Date();
    const reached = date.reached(now, later5000);
    const reached2 = date.reached(now, earlier2500);
    const reached3 = date.reached(now, now);
    assert.equal(reached, true);
    assert.equal(reached2, false);
    assert.equal(reached3, true);
  });

  it('unix', () => {
    const now = Date.now();
    const unix = date.unix(now);
    assert.equal(String(unix).length, (String(now).length - 3));
    assert.equal(unix, Math.floor(now / 1000));

    assert.throws(() => {
      date.unix('asd');
    }, { message: 'Wrong date format' });
  });

  it('verbal', () => {
    const time = date.verbal('2d 10s 20s 5m');
    const expected = (date.DAY * 2) + (30 * date.SECOND) + (5 * date.MINUTE);
    assert.equal(time, expected);

    assert.throws(() => {
      date.verbal('2a 10s 20s 5m');
    }, { message: "Wrong verbal format, available only '1d 2h 3m 4s' pattern" });

    assert.equal(date.verbal(1), 0);
  });

  it('verbalEpoch', () => {
    const now = Date.now();
    const time = date.verbalEpoch('2d 10s 20s 5m');
    const expected = ((date.DAY * 2) + (30 * date.SECOND) + (5 * date.MINUTE)) + now;
    assert.equal(time, expected);
  });

  it('midnight', () => {
    const now = Date.now();
    const midnight = date.midnight(now);
    const expected = new Date().setHours(0, 0, 0, 0);
    assert.equal(midnight, expected);

    assert.throws(() => {
      date.midnight('2q3');
    }, { message: 'Wrong date format' });
  });

  it('midnightUTC', () => {
    const now = Date.now();
    const midnight = date.midnightUTC(now);
    const expected = new Date().setUTCHours(0, 0, 0, 0);
    assert.equal(midnight, expected);

    assert.throws(() => {
      date.midnightUTC('2q3');
    }, { message: 'Wrong date format' });
  });

  it('valid', () => {
    assert.ok(date.valid(new Date()));
    assert.ok(date.valid(new Date().toISOString()));
    assert.ok(date.valid(new Date().toString()));
    assert.ok(!date.valid(new Date().getTime()));
    assert.ok(!date.valid('abc'));
  });
});
