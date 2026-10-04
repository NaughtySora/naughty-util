'use strict';

const weakAssign = (target, mixin) => {
  const keys = Object.keys(mixin);
  for (const key of keys) {
    if (typeof target[key] !== 'undefined') continue;
    target[key] = mixin[key];
  }
  return target;
};

const forget = (target, keys) => {
  for (const key of keys) delete target[key];
  return target;
};

//TODO test | types
const merge = (target, source) => {
  if (isPrimitive(source) || isPrimitive(target)) return target;
  const stack = [[target, source]];
  while (stack.length > 0) {
    const { 0: target, 1: source } = stack.pop();
    for (const { 0: key, 1: value } of entries(source)) {
      if (isPlainObject(target[key]) && isPlainObject(value)) {
        stack.push([target[key], value]);
      } else {
        target[key] = value;
      }
    }
  }
  return target;
};

module.exports = {
  weakAssign,
  forget,
  merge,
};
