'use strict';

const assert = require('node:assert');
const { describe, it } = require('node:test');
const { palette } = require('../main');

describe("palette", () => {
  it("dye", () => {
    const TEXT = "test";
    const text = palette.dye(palette.COLORS.blue, TEXT);
    assert.strictEqual(text, `${palette.COLORS.blue}${TEXT}${palette.CLEAN}`);
  });

  it("CLEAN", () => {
    assert.ok(typeof palette.CLEAN === "string");
  });

  it("CLEAN", () => {
    assert.ok(typeof palette.COLORS.blue === "string");
    assert.ok(typeof palette.COLORS.cyan === "string");
    assert.ok(typeof palette.COLORS.gray === "string");
    assert.ok(typeof palette.COLORS.green === "string");
    assert.ok(typeof palette.COLORS.purple === "string");
    assert.ok(typeof palette.COLORS.red === "string");
    assert.ok(typeof palette.COLORS.white === "string");
    assert.ok(typeof palette.COLORS.yellow === "string");
  });
});