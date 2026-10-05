'use strict';

const { valid } = require("./array.js");

const FALSY = new Set([false, undefined, null, '', 0, 0n]);
const OBJECT_PROTO = new Set([Object.prototype, null]);

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
//TODO test
const isPlainObject = entity =>
  entity !== null &&
  typeof entity === "object" &&
  OBJECT_PROTO.has(Object.getPrototypeOf(entity));

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
