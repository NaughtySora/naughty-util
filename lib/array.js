'use strict';

const { entries, getOwnPropertySymbols,
  setPrototypeOf, defineProperty } = Object;
const { isArray } = Array;

const valid = (data, length = 1) => isArray(data) && data.length >= length;

const accessor = (array, meta) => {
  function Accessor() { }
  for (const [key, index] of entries(meta)) {
    defineProperty(Accessor.prototype, key, {
      get() {
        return this[index];
      },
      set(value) {
        this[index] = value;
      },
    });
  }
  for (const symbol of getOwnPropertySymbols(meta)) {
    defineProperty(Accessor.prototype, symbol, {
      get() {
        return this[meta[symbol]];
      },
      set(value) {
        this[meta[symbol]] = value;
      },
    });
  }
  setPrototypeOf(array, Accessor.prototype);
  return array;
};

// Based on the algorithm described here:
// https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const avg = (dataset, callback) => {
  if (!valid(dataset)) return 0;
  let result = 0;
  for (const item of dataset) {
    result += callback(item);
  }
  return result / dataset.length;
};

const max = (dataset, callback) => {
  if (!valid(dataset)) return -Infinity;
  let result = -Infinity;
  for (const item of dataset) {
    const value = callback(item);
    if (result < value) result = value;
  }
  return result;
};

const min = (dataset, callback) => {
  if (!valid(dataset)) return Infinity;
  let result = Infinity;
  for (const item of dataset) {
    const value = callback(item);
    if (result > value) result = value;
  }
  return result;
};

const sum = (dataset, callback) => {
  if (!valid(dataset)) return 0;
  let result = 0;
  for (const item of dataset) {
    const value = callback(item);
    result += value;
  }
  return result;
};

module.exports = {
  valid,
  accessor,
  shuffle,
  sample,
  avg,
  max,
  min,
  sum,
};
