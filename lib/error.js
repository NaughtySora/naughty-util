"use strict";

const { ctor } = require("./reflection.js");
const { hasOwn, getPrototypeOf } = Object;

class DomainError extends Error {
  time = new Date().toISOString();
  name = "DomainError";
  #protos = null;

  constructor(message, options) {
    super(message, { cause: options?.cause });
    this.code = options?.code ?? 400;
    this.details = options?.details ?? null;
    Error.captureStackTrace(this, DomainError);
  }

  toJSON() {
    return {
      code: this.code,
      stack: this.stack,
      message: this.message,
      details: this.details,
      time: this.time,
    };
  }

  toString() {
    return `DomainError: ${this.message}`;
  }

  valueOf() {
    return this.toString();
  }

  log() {
    return `${this.time}: ${this.message}`;
  }

  toError() {
    const cause = this.cause;
    const message = this.message;
    return new Error(message, { cause });
  }

  #capture() {
    if (!this.#protos === null || !this.cause) return;
    if (!this.#protos.has(ctor(this.cause))) return;
    if (this?.cause?.message) this.message = this.cause.message;
    if (this?.cause?.code) this.code = this.cause.code;
  }

  adopt(...entities) {
    this.#protos = new Set(entities);
    this.#capture();
    return this;
  }
}

const toJSON = error => {
  if (hasOwn(getPrototypeOf(error), "toJSON")) return error.toJSON();
  return {
    message: error?.message,
    stack: error?.stack,
    cause: error?.cause ? toJSON(error.cause) : null,
  };
};

class DescriptiveError extends Error {
  constructor(message, options) {
    super(message, options);
    this.code = options?.code ?? 400;
    Error.captureStackTrace(this, DescriptiveError);
  }
}

const throwNullable = (entity, e) => {
  if (entity == null) {
    throw e ?? new Error("Value is null or undefined");
  }
};

class ImplementationError extends Error {
  name = "ImplementationError";

  constructor(message, options) {
    super(message ?? "Implementation error exception", options);
    Error.captureStackTrace(this, ImplementationError);
  }

  static ctor(Class) {
    return new ImplementationError(
      `Invalid "${Class.name}" constructor call`
    );
  }

  static method(Class, method) {
    return new ImplementationError(
      `"${Class.name}.${method}" is not implemented`
    );
  }
}

module.exports = {
  DomainError,
  DescriptiveError,
  ImplementationError,
  toJSON,
  throwNullable,
};
