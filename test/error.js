'use strict';

const { error } = require('../main.js');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('error', () => {
  it('DomainError', () => {
    const cause = new Error("1234");
    const err = new error.DomainError("test", { code: 400, details: { a: 1 }, cause });
    assert.strictEqual(err.message, "test");
    assert.strictEqual(err.code, 400);
    assert.deepStrictEqual(err.details, { a: 1 });
    assert.deepStrictEqual(err.cause, cause);
    assert.match(err.log(), /.+\:\stest/);
    assert.strictEqual(err.name, "DomainError");
    assert.ok(typeof err.stack === "string");
    assert.ok(Number.isFinite(Date.parse(err.time)));
    assert.deepStrictEqual(err.toError(), new Error(err.message, { cause }));
    assert.deepStrictEqual(err.toJSON(), {
      code: err.code,
      stack: err.stack,
      message: err.message,
      details: err.details,
      time: err.time,
    });
    assert.strictEqual(err.toString(), `DomainError: ${err.message}`);
    assert.strictEqual(err.valueOf(), `DomainError: ${err.message}`);
    assert.strictEqual(err.valueOf() + "", `DomainError: ${err.message}`);
    assert.strictEqual(err.valueOf() + 1, `DomainError: ${err.message}1`);
  });
});