'use strict';

const safe = (input) => {
  const value = parseFloat(input);
  return Number.isFinite(value) ? value : 0.0;
};

const positiveInt = (value) => Number.isInteger(value) && value >= 0;

module.exports = {
  safe,
  positiveInt,
};
