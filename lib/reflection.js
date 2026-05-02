'use strict';

const { valid } = require("./array.js");

const FALSY = new Set([false, undefined, null, '', 0, 0n, NaN]);

const ctor = entity => Object.getPrototypeOf(entity).constructor;

const AsyncFunctionConstructor = ctor(async () => { });

const isClass = entity =>
  typeof entity === 'function' && entity.toString().startsWith('class');
const isEmpty = entity => entity === undefined || entity === null;
const isPrimitive = entity => Object(entity) !== entity;
const isComplex = entity => !isPrimitive(entity)
const isFalsy = entity => FALSY.has(entity) || entity !== entity;
const isError = Error.isError ?? (entity => entity instanceof Error);
const isAsyncFunction = entity => ctor(entity) === AsyncFunctionConstructor;
const isObject = entity => typeof entity === 'object' &&
  entity !== null && !Array.isArray(entity);

const inspect = (...args) =>
  console.dir(...args, {
    depth: Infinity,
    maxArrayLength: Infinity,
    maxStringLength: Infinity,
    showHidden: true,
  });

module.exports = {
  isClass,
  isEmpty,
  isPrimitive,
  isComplex,
  isFalsy,
  isError,
  isAsyncFunction,
  isObject,
  isArray: valid,
  ctor,
  inspect,
};
