"use strict";
const assert = require("node:assert");
const test = require("./framework.js");
const { misc } = require("../main");

const inRange = () => {
  const mock = [[2, 2, 4], [-25, 0, 25], ["g", "a", "m"], ["C", "A", "Z"], ["z", "a", "g"]];
  const expected = [true, false, true, true, false];
  for (let i = 0; i < mock.length; i++) {
    const actual = misc.inRange(...mock[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

const compose = () => {
  const mock = [
    [() => 13, x => x ** 2, x => x / 2, x => String(x)],
    [(s, delimiter) => `${delimiter}${s}${delimiter}`, (s) => s.length, length => length / 2]
  ];
  const params = [[undefined], ["Hello", "---"]]
  const expected = ["84.5", 5.5];

  for (let i = 0; i < mock.length; i++) {
    const fn = misc.compose(...mock[i]);
    const actual = fn(...params[i]);
    assert.deepEqual(actual, expected[i]);
  }
};

test.sync([inRange, compose], "misc");
