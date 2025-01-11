"use strict";
const array = require("./array")
const id = x => x;

const inRange = (value, min, max) => value >= min && value <= max;

const compose = (...fns) => (...args) => {
  if (!array.valid(fns)) return args;
  let result = fns.shift()(...args);
  for (const fn of fns) result = fn(result);
  return result;
};

module.exports = {
  id,
  inRange,
  compose,
};
