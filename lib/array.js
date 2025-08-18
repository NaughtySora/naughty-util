"use strict";

const valid = data => Array.isArray(data, length = 0) && data.length >= length;

const defineField = (entity, key, index) => {
  Object.defineProperty(entity, key, {
    get() {
      return this[index];
    },
    set(value) {
      this[index] = value;
    },
  });
};

const accessor = (array, meta) => {
  const entries = Object.entries(meta);
  const symbols = Object.getOwnPropertySymbols(meta);
  function Accessor() { }
  for (const [key, index] of entries) {
    defineField(Accessor.prototype, key, index);
  }
  for (const symbol of symbols) {
    defineField(Accessor.prototype, symbol, meta[symbol]);
  }
  Object.setPrototypeOf(array, Accessor.prototype);
  return array;
};

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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
  valid, // length param 
  accessor,
  shuffle, // new
  avg, // new
  max, // new
  min, // new
  sum, // new
};
