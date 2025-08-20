'use strict';

const AsyncFunctionConstructor = (async () => { }).constructor;
const FALSY = [false, 0, '', null, undefined, -0, +0, 0n, NaN];

const isClass = entity => typeof entity === 'function' && entity.toString().startsWith('class');
const isEmpty = entity => entity === undefined || entity === null;
const isPrimitive = entity => typeof entity !== 'object' && typeof entity !== 'function';
const isComplex = entity => !isEmpty(entity) && !isPrimitive(entity);
const isFalsy = entity => {
  for (const i of FALSY) {
    if (Object.is(i, entity)) return true;
  }
  return false;
};
const isError = entity => entity instanceof Error;
const isAsyncFunction = entity => entity?.constructor === AsyncFunctionConstructor;
const isObject = entity => typeof entity === 'object' && entity !== null && !Array.isArray(entity);

module.exports = {
  isClass,
  isEmpty,
  isPrimitive,
  isComplex,
  isFalsy,
  isError,
  isAsyncFunction,
  isObject,
};
