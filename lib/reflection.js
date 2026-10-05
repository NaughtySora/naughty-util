'use strict';

const { valid } = require("./array.js");

const OBJECT_PROTO = ({}).__proto__;
const FALSY = new Set([false, undefined, null, '', 0, 0n]);

const ctor = entity => Object.getPrototypeOf(entity).constructor;

const AsyncFunctionConstructor = ctor(async () => { });

const isClass = entity =>
  typeof entity === 'function' && entity.toString().startsWith('class');
const isEmpty = entity => entity == null;
const isPrimitive = entity => Object(entity) !== entity;
const isComplex = entity => Object(entity) === entity;
const isFalsy = entity => FALSY.has(entity) || entity !== entity;
const isError = Error.isError ?? (entity => entity instanceof Error);
const isAsyncFunction = entity => ctor(entity) === AsyncFunctionConstructor;
const isObject = entity => typeof entity === 'object' &&
  entity !== null && !Array.isArray(entity);

const isPlainObject = entity => {
  if (typeof entity !== "object" || entity === null) return false;
  const proto = Object.getPrototypeOf(entity);
  if (proto === OBJECT_PROTO || proto === null) return true;
  return false;
};

const INSPECT_OPTIONS = {
  depth: Infinity,
  maxArrayLength: Infinity,
  maxStringLength: Infinity,
};

const EXPOSE_OPTIONS = {
  ...INSPECT_OPTIONS,
  showHidden: true,
};

const inspect = item => console.dir(item, INSPECT_OPTIONS);

const expose = item => console.dir(item, EXPOSE_OPTIONS);

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
  isPlainObject,
  expose,
};
