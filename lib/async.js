'use strict';

const array = require('./array.js');

const promisify = (fn) => (...params) => {
  const promise = new Promise((resolve, reject) => {
    const callback = (err, data) => {
      if (err) reject(err);
      else resolve(data);
    };
    fn(...params, callback);
  });
  return promise;
};

const compose = (...fns) =>
  async (...args) => {
    if (!array.valid(fns)) return args;
    let result = await fns[0](...args);
    for (let i = 1; i < fns.length; i++) result = await fns[i](result);
    return result;
  };

const thenable = (fn, ...params) => ({
  then(resolve, reject) {
    const callback = (err, data) => {
      if (err) reject?.(err);
      else resolve(data);
    };
    fn(...params, callback);
  },
});

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

const parallel = (...fns) =>
  (...args) => Promise.all(fns.map((fn, idx) => fn(args[idx])));

const resolve = async (ms, value) => {
  await pause(ms);
  return value;
};

const reject = async (ms, error) => {
  await pause(ms);
  throw (error ?? new Error('Promise reject timeout'));
};

module.exports = {
  promisify,
  compose,
  thenable,
  pause,
  parallel,
  resolve,
  reject,
};
