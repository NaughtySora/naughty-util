'use strict';

class DomainError extends Error {
  #message;
  code;
  details = null;
  time = new Date().toISOString();

  constructor(message, { code = 400, cause, details = null }) {
    super(message, { cause });
    this.name = DomainError.name;
    this.#message = message;
    this.code = code;
    this.message = code ? `[${code}]: ${message}` : message;
    this.details = details;
  }

  toJSON() {
    return {
      code: this.code,
      cause: this.cause,
      message: this.#message,
      details: this.details,
      time: this.time,
    };
  }

  toString() {
    return this.message;
  }

  log() {
    return `${this.time} ${this.message}`;
  }
}

export default DomainError;