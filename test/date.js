"use strict";
const assert = require("node:assert");
const test = require("./framework");
const { date } = require("../main");

const difference = () => {
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
};

const reached = () => {
  const later5000 = Date.now() + 5000;
  const earlier2500 = Date.now() - 2500;
  const now = new Date();
  const reached = date.reached(now, later5000);
  const reached2 = date.reached(now, earlier2500);
  const reached3 = date.reached(now, now);
  assert.strictEqual(reached, true);
  assert.strictEqual(reached2, false);
  assert.strictEqual(reached3, true);
};

const unix = () => {
  const now = Date.now();
  const unix = date.unix(now);
  const isEqualLength = String(unix).length === String(now).length - 3;
  assert.strictEqual(isEqualLength, true);
};

const verbal = () => {
  const time = date.verbal("2d 10s 20s 5m");
  const expected = date.DAY * 2 + 30 * date.SECOND + 5 * date.MINUTE;
  assert.strictEqual(time, expected);
};

const verbalEpoch = () => {
  const now = Date.now();
  const time = date.verbalEpoch("2d 10s 20s 5m");
  const expected = (date.DAY * 2 + 30 * date.SECOND + 5 * date.MINUTE) + now;
  assert.strictEqual(time, expected);
};

const midnightUTC = () => {
  const now = Date.now();
  const midnight = date.midnightUTC(now);
  const expected = new Date().setUTCHours(0, 0, 0, 0);
  assert.strictEqual(midnight, expected);
}

const midnight = () => {
  const now = Date.now();
  const midnight = date.midnight(now);
  const expected = new Date().setHours(0, 0, 0, 0);
  assert.strictEqual(midnight, expected);
}

test.sync([difference, reached, unix, verbal, verbalEpoch, midnightUTC, midnight], "date");