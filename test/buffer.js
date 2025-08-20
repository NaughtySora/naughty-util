'use strict';
const assert = require('node:assert');
const { buffer } = require('../main');
const { describe, it } = require('node:test');

describe("buffer", async () => {
  await it("random", async () => {
    const LENGTH = 32;
    const content = await buffer.random(LENGTH);
    assert.equal(Buffer.isBuffer(content), true);
    assert.equal(content.length, LENGTH);
  });
});