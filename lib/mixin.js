'use strict';

const weakAssign = (target, mixin) => {
  const keys = Object.keys(mixin);
  for (const key of keys) {
    if (typeof target[key] !== 'undefined') continue;
    target[key] = mixin[key];
  }
  return target;
};

//TODO remove cause bad js optimization in 1.0
const forget = (target, keys) => {
  for (const key of keys) delete target[key];
  return target;
};

module.exports = {
  weakAssign,
  forget,
};
