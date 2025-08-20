'use strict';

const array = require('./array.js');

const { hasOwn, assign } = Object;
const { isArray } = Array;
const { random, floor } = Math;

const id = x => x;
const partial = (fn, ...params) => fn.bind(null, ...params);
const inRange = (value, min, max) => value >= min && value <= max;

const compose = (...fns) => (...args) => {
  if (!array.valid(fns)) return args;
  let result = fns[0](...args);
  for (let i = 1; i < fns.length; i++) result = fns[i](result);
  return result;
};

function* range(end, start = 0, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

const projection = (meta, data) => {
  const result = {};
  for (const [key, name = key, fn] of meta) {
    if (!hasOwn(data, key)) continue;
    const original = data[key];
    if (isArray(name) && typeof original === 'object') {
      if (!original) continue;
      assign(result, fn ? fn(projection(name, original)) : projection(name, original));
    } else {
      result[name] = fn ? fn(original) : original;
    }
  }
  return result;
};

function* enumerate(iter) {
  let i = 0;
  for (const item of iter) yield [item, i++];
}

const NANO = 1000000n;

const timestamp = () => {
  const start = process.hrtime.bigint();
  return () => {
    const nanoseconds = process.hrtime.bigint() - start;
    return {
      seconds: parseFloat(nanoseconds / NANO),
      nanoseconds,
    };
  };
};

module.exports = {
  id,
  inRange,
  compose,
  projection,
  partial,
  range,
  random: (max, min = 0) => floor(random() * (max - min) + min) + 1,
  unique: () => random().toString(32).substring(2),
  enumerate,
  timestamp,
};
