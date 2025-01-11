"use strict";
const assert = require("node:assert");
const test = require("./framework");
const { mixin } = require("../main");

const WeakAssign = () => {
  const target = { a: 1, b: 2, c: 3 };
  const mix = { a: 3, e: 33, test: "Hello" };
  const result = mixin.weakAssign(target, mix);
  assert.strictEqual(target, result);
  assert.deepEqual(target, { a: 1, b: 2, c: 3, e: 33, test: "Hello" });
};

const forget = () => {
  const target = { a: 1, b: 2, c: 3, e: 33, test: "Hello" };
  const result = mixin.forget(target, ["test", "a"]);
  assert.strictEqual(target, result);
  assert.deepEqual(target, { b: 2, c: 3, e: 33, });
};

test.sync([WeakAssign, forget], "mixin");