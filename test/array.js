"use strict";
const assert = require("node:assert");
const test = require("./test");
const { array } = require("../main");

const valid = async () => {
  const mock = [{ a: 1 }, 1, Boolean, true, "123", [1, 2, 3], new Map(), new Set(), []];
  const expected = [false, false, false, false, false, true, false, false, false];
  for (let i = 0; i < mock.length; i++) {
    const actual = array.valid(mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

test.sync([valid], "array");