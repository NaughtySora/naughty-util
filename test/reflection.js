'use strict';

const { reflection, misc } = require('../main');
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

describe.only("reflection", () => {
  it('isAsyncFunction', () => {
    assert.ok(reflection.isAsyncFunction(async () => { }));
    assert.ok(!reflection.isAsyncFunction(() => { }));
    assert.ok(!reflection.isAsyncFunction(1));
  });

  it('isClass', () => {
    assert.ok(reflection.isClass(class A { }), true);
    assert.ok(!reflection.isClass(() => { }));
    assert.ok(!reflection.isClass(async function () { }));
    assert.ok(!reflection.isClass({}));
  });

  it('isComplex', () => {
    assert.ok(reflection.isComplex({}));
    assert.ok(!reflection.isComplex(null));
    assert.ok(reflection.isComplex(new RegExp()));
    assert.ok(reflection.isComplex(new Error()));
    assert.ok(!reflection.isComplex(1));
    assert.ok(!reflection.isComplex(true));
    assert.ok(!reflection.isComplex("asd"));
  });

  it('isEmpty', () => {
    assert.ok(reflection.isEmpty(null));
    assert.ok(reflection.isEmpty(undefined));
    assert.ok(!reflection.isEmpty(""));
    assert.ok(!reflection.isEmpty({}));
    assert.ok(!reflection.isEmpty(1));
  });

  it('isError', () => {
    class E extends TypeError { };
    const e = new E();
    const error = new Error();
    const syntax = new SyntaxError();
    assert.ok(reflection.isError(e));
    assert.ok(reflection.isError(error));
    assert.ok(reflection.isError(syntax));
    assert.ok(!reflection.isError(""));
    assert.ok(!reflection.isError({ message: "" }));
    assert.ok(!reflection.isError({ message: "", stack: "" }));
  });

  it('isFalsy', () => {
    assert.ok(reflection.isFalsy(""));
    assert.ok(reflection.isFalsy(0));
    assert.ok(reflection.isFalsy(-0));
    assert.ok(reflection.isFalsy(+0));
    assert.ok(reflection.isFalsy(0n));
    assert.ok(reflection.isFalsy(null));
    assert.ok(reflection.isFalsy(undefined));
    assert.ok(reflection.isFalsy(NaN));
    assert.ok(reflection.isFalsy(false));
    assert.ok(!reflection.isFalsy(true));
    assert.ok(!reflection.isFalsy({}));
    assert.ok(!reflection.isFalsy([]));
    assert.ok(!reflection.isFalsy("213"));
  });

  it('isObject', () => {
    assert.ok(reflection.isObject({}));
    assert.ok(!reflection.isObject(null));
    assert.ok(reflection.isObject(new RegExp()));
    assert.ok(reflection.isObject(new Error()));
    assert.ok(!reflection.isObject(1));
    assert.ok(!reflection.isObject(true));
    assert.ok(!reflection.isObject("asd"));
    assert.ok(!reflection.isObject(() => { }));
  });

  it('isPrimitive', () => {
    assert.ok(!reflection.isPrimitive({}));
    assert.ok(reflection.isPrimitive(null));
    assert.ok(!reflection.isPrimitive(new RegExp()));
    assert.ok(!reflection.isPrimitive(new Error()));
    assert.ok(reflection.isPrimitive(1));
    assert.ok(reflection.isPrimitive(true));
    assert.ok(reflection.isPrimitive("asd"));
  });

  it('ctor', () => {
    const AsyncFunctionConstructor = (async () => { }).constructor;
    assert.ok(reflection.ctor(async () => { }), AsyncFunctionConstructor);
    assert.ok(reflection.ctor({}), Object);
    assert.ok(reflection.ctor(1), Number);
    assert.ok(reflection.ctor(""), String);
    assert.ok(reflection.ctor(0n), BigInt);
  });
});
