'use strict';

class DomainError extends Error {
  time = new Date().toISOString();

  constructor(message = "", { code = 400, cause = null, details = null } = {}) {
    super(message, { cause });
    this.name = DomainError.name;
    this.code = code;
    this.details = details;
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
}

module.exports = { DomainError };