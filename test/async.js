"use strict";
const assert = require("node:assert");
const test = require("./framework.js");
const { async } = require("../main");
const fs = require("node:fs");

const promisify = async () => {
  const readAsync = async.promisify(fs.readFile);
  const text = await readAsync(__filename, "utf-8");
  const buffer = await readAsync(__filename);
  if (typeof text !== "string") assert.fail("No content");
  if (!Buffer.isBuffer(buffer)) assert.fail("No buffer");
};

const compose = async () => {
  const promiseFn = async.promisify(fs.readFile);
  const toUpperFile = async.compose(promiseFn, data => data.toUpperCase());
  const first30 = async.compose(promiseFn, data => data.toString(), s => s.substring(0, 30));
  const text = await toUpperFile(__filename, "utf-8");
  const cut = await first30(__filename);
  if (typeof text !== "string") assert.fail("No content");
  assert.strictEqual(cut.length, 30);
};

const thenable = async () => {
  const content = await async.thenable(fs.readFile, __filename, "utf-8");
  if (typeof content !== "string") assert.fail("No content");
};

const parallel = async () => {
  const x = async (x = 0) => x;
  const x2 = async (x = 1) => x * x;
  const composition = async.parallel(x, x2);
  {
    const [xResult, x2Result] = await composition();
    assert.strictEqual(xResult, 0);
    assert.strictEqual(x2Result, 1);
  }
  {
    const arr = [1, 2, 3];
    const [xResult, x2Result] = await composition(arr, 5);
    assert.deepStrictEqual(xResult, arr);
    assert.strictEqual(x2Result, 25);
  }
  {
    const [xResult, x2Result] = await composition(undefined, 3);
    assert.strictEqual(xResult, 0);
    assert.strictEqual(x2Result, 9);
  }
  {
    const [xResult, x2Result] = await composition("test");
    assert.strictEqual(xResult, "test");
    assert.strictEqual(x2Result, 1);
  }
};

test.async([promisify, compose, thenable, parallel], "async");