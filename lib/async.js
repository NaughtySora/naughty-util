"use strict";
const array = require("./array");

const promisify = fn => (...params) => {
  const promise = new Promise((resolve, reject) => {
    const callback = (err, data) => {
      if (err) reject?.(err);
      else resolve?.(data);
    };
    fn(...params, callback);
  });
  return promise;
};

const compose = (...fns) => async (...args) => {
  if (!array.valid(fns)) return args;
  let result = await fns.shift()(...args);
  for (const fn of fns) result = await fn(result);
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

const pause = ms => new Promise(r => setTimeout(r, ms));

module.exports = {
  promisify,
  compose,
  thenable,
  pause,
};
