'use strict';

const { ctor } = require('./reflection.js');
const { hasOwn, getPrototypeOf } = Object;

class DomainError extends Error {
  time = new Date().toISOString();
  #protos = null;

  constructor(message, options) {
    super(message, { cause: options?.cause });
    this.name = DomainError.name;
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
  constructor(...args) {
    super(...args);
    this.code = args[1]?.code ?? 400;
    Error.captureStackTrace(this, DescriptiveError);
  }
}

module.exports = { DomainError, DescriptiveError, toJSON };
