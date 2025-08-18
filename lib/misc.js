'use strict';

const array = require('./array.js');

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
    if (!Object.hasOwn(data, key)) continue;
    const original = data[key];
    if (Array.isArray(name) && typeof original === 'object') {
      if (!original) continue;
      Object.assign(result, fn ? fn(projection(name, original)) : projection(name, original));
    } else {
      result[name] = fn ? fn(original) : original;
    }
  }
  return result;
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function* enumerate(iter) {
  let i = 0;
  for (const item of iter) {
    yield [item, i++]
  }
}

const time_ratio = 1000000n;

const timestamp = () => {
  const start = process.hrtime.bigint();
  return () => {
    const end = process.hrtime.bigint();
    return parseInt((end - start) / time_ratio);
  };
};

const hash = () => Math.random().toString(32).substring(2);

module.exports = {
  id,
  inRange,
  compose,
  projection,
  partial,
  range,
  random, // new
  enumerate, // new
  timestamp, // new
  hash, // new
};
