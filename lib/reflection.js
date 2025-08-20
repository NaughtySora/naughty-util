'use strict';

const AsyncFunctionConstructor = (async () => { }).constructor;
const FALSY = [false, 0, '', null, undefined, -0, +0, 0n,];

const isClass = entity => typeof entity === 'function' && entity.toString().startsWith('class');
const isEmpty = entity => entity === undefined || entity === null;
const isPrimitive = entity => typeof entity !== 'object' && typeof entity !== 'function';
const isComplex = entity => !isEmpty(entity) && !isPrimitive(entity);
const isFalsy = entity => FALSY.includes(entity) || Object.is(entity, NaN);
const isError = entity => entity instanceof Error;
const isAsyncFunction = entity => entity?.constructor === AsyncFunctionConstructor;
const isHashObject = entity => typeof entity === 'object' && entity !== null && !Array.isArray(entity);

module.exports = {
  isClass,
  isEmpty,
  isPrimitive,
  isComplex,
  isFalsy,
  isError,
  isAsyncFunction,
};
