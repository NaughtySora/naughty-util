'use strict';

const number = require('./number.js');

const INTERVALS = Object.freeze({
  __proto__: null,
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 60 * 60 * 24 * 1000,
});

const verbal = (input) => {
  let time = 0;
  if (typeof input !== 'string') return time;
  const parts = input.trim().toLowerCase().split(' ');
  for (const part of parts) {
    const length = part.length - 1;
    const key = part[length];
    const base = INTERVALS[key];
    if (!base) {
      throw new Error("Wrong verbal format, available only '1d 2h 3m 4s' pattern");
    }
    const multiplier = part.slice(0, length);
    time += base * number.safe(multiplier);
  }
  return time;
};

const verbalEpoch = (input) => {
  const time = verbal(input);
  return Date.now() + time;
};

const unix = (input) => {
  const date = new Date(input);
  if (isNaN(Date.parse(date))) throw new Error('Wrong date format');
  return Math.floor(date.getTime() / INTERVALS.s);
};

const difference = (base, target) => new Date(target).getTime() - new Date(base).getTime();

const reached = (base, target) => new Date(target).getTime() >= new Date(base).getTime();

const midnightUTC = (input) => {
  const date = new Date(input);
  if (isNaN(Date.parse(date))) throw new Error('Wrong date format');
  return date.setUTCHours(0, 0, 0, 0);
};

const midnight = (input) => {
  const date = new Date(input);
  if (isNaN(Date.parse(date))) throw new Error('Wrong date format');
  return date.setHours(0, 0, 0, 0);
};

module.exports = {
  verbalEpoch,
  verbal,
  unix,
  difference,
  midnightUTC,
  midnight,
  reached,
  DAY: INTERVALS.d,
  HOUR: INTERVALS.h,
  MINUTE: INTERVALS.m,
  SECOND: INTERVALS.s,
};
