'use strict';

const { isEmpty, isError } = require('./reflection.js');

const factorify =
  (dataset, nullable = null) =>
  (key) =>
    dataset[key] ?? nullable;
const factory =
  (Interface, ...params) =>
  () =>
    new Interface(...params);

const kValue = Symbol('value');
const kKind = Symbol('kind');

class Box {
  [kValue];
  [kKind];

  valueOf() {
    return this[kKind];
  }

  unwrap() {
    return this[kValue];
  }
}

class Option extends Box {
  constructor(value) {
    super();
    if (isEmpty(value)) {
      this[kKind] = 'None';
    } else {
      this[kKind] = 'Some';
      this[kValue] = value;
    }
  }

  static from(value) {
    return new Option(value);
  }
}

class Result extends Box {
  constructor(value) {
    super();
    this[kKind] = isError(value) ? 'Err' : 'Ok';
    this[kValue] = value;
  }

  static from(value) {
    return new Result(value);
  }
}

const match = (entity, strategies) => {
  const strategy = strategies[entity.valueOf()];
  if (typeof strategy !== 'function') {
    const wildcard = strategies['_'];
    if (typeof wildcard !== 'function') {
      throw new Error("Can't find matched strategy");
    }
    return wildcard(entity.unwrap());
  }
  return strategy(entity.unwrap());
};

module.exports = {
  factorify,
  factory,
  match,
  Result,
  Option,
};
