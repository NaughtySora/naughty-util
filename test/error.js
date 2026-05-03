'use strict';

const { error } = require('../main');
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DomainError, DescriptiveError, toJSON } = require('../lib/error');

describe('error', () => {
  it('DomainError', () => {
    const cause = new Error("1234");
    const err = new error.DomainError("test", { code: 400, details: { a: 1 }, cause });
    assert.equal(err.message, "test");
    assert.equal(err.code, 400);
    assert.deepEqual(err.details, { a: 1 });
    assert.deepEqual(err.cause, cause);
    assert.match(err.log(), /.+\:\stest/);
    assert.equal(err.name, "DomainError");
    assert.ok(typeof err.stack === "string");
    assert.ok(Number.isFinite(Date.parse(err.time)));
    assert.deepEqual(err.toError(), new Error(err.message, { cause }));
    assert.deepEqual(err.toJSON(), {
      code: err.code,
      stack: err.stack,
      message: err.message,
      details: err.details,
      time: err.time,
    });
    assert.equal(err.toString(), `DomainError: ${err.message}`);
    assert.equal(err.valueOf(), `DomainError: ${err.message}`);
    assert.equal(err.valueOf() + "", `DomainError: ${err.message}`);
    assert.equal(err.valueOf() + 1, `DomainError: ${err.message}1`);
  });

  it('adopt', () => {
    const cause = new DescriptiveError('b', { code: 111 });
    const error = new DomainError('a', { cause });
    assert.equal(error.message, 'a');
    assert.equal(error.code, 400);
    assert.deepEqual(error.cause, cause);
    const error2 = new DomainError('c', { cause }).adopt(DescriptiveError);
    assert.equal(error2.message, cause.message);
    assert.equal(error2.code, cause.code);
    assert.equal(error2.cause, cause);
    const error3 = new DomainError('e', { code: 333 }).adopt(DescriptiveError);
    assert.equal(error3.message, 'e');
    assert.equal(error3.code, 333);
    assert.deepEqual(error3.cause, undefined);
  });

  it('toJSON', () => {
    const error0 = new DomainError('e', { code: 333 });
    const error1 = new Error('e', { cause: error0 });
    assert.deepEqual(toJSON(error0), {
      code: error0.code,
      stack: error0.stack,
      message: error0.message,
      details: error0.details,
      time: error0.time,
    });
    assert.deepEqual(toJSON(error1), {
      message: error1?.message,
      stack: error1?.stack,
      cause: toJSON(error0),
    });
  });
});
