'use strict';

const { isEmpty, isError } = require("./reflection");

const factorify = (dataset, nullable = null) => (key) => dataset[key] ?? nullable;
const factory = (Interface, ...params) => () => new Interface(...params);

const kValue = Symbol();
const kKind = Symbol();

class Box {
  [kValue];
  [kKind];

  valueOf() {
    return this[kKind];
  }

  unwrap() {
    return this[kValue];
  }

  from(value) {
    const Class = this.constructor;
    return new Class(value);
  }
}

class None {
  constructor() {
    return new Option();
  }
}

class Some {
  constructor(value) {
    return new Option(value);
  }
}

class Err {
  constructor(err) {
    return new Result(err);
  }
}

class Ok {
  constructor(value) {
    return new Result(err);
  }
}

class Option extends Box {
  constructor(value) {
    super();
    this[kKind] = isEmpty(value) ? "None" : "Some";
    this[kValue] = value;
  }
}

class Result extends Box {
  constructor(value) {
    super();
    this[kKind] = isError(value) ? "Err" : "Ok";
  }
}

const match = (entity, strategies) => {
  const strategy = strategies[entity.valueOf()];
  if (typeof strategy !== "function") {
    const wildcard = strategies["_"];
    if (typeof wildcard !== "function") {
      throw new Error("Can't find matched strategy");
    }
    return wildcard(entity.unwrap());
  }
  return strategies(entity.unwrap());
};

const data = new Option("asd");
const err = new Result(new Error("a"));

match(data, {
  Option: (v) => v,
  None: () => 'hello',
});

match(err, {
  Ok: (v) => v,
  Err: () => 'hello',
});

module.exports = {
  factorify,
  factory,
  match, // new
  Result, // new
  Option, // new
  Ok, // new
  Err, // new
  Some, // new
  None, // new
};

