'use strict';
const assert = require('node:assert');
const { describe, it } = require('node:test');
const { stream } = require('../main');
const { Readable } = require('node:stream');
const fs = require('node:fs');

describe('stream', async () => {
  await it('read', async () => {
    const readable = new Readable();
    readable.push('Hello ');
    readable.push('World');
    readable.push('!');
    readable.push(null);

    const content = await stream.read(readable);
    const text = content.toString();
    assert.ok(Buffer.isBuffer(content));
    assert.strictEqual(text, 'Hello World!');

    const file = fs.createReadStream(__filename);
    const content2 = await stream.read(file);
    const text2 = content2.toString();
    assert.ok(Buffer.isBuffer(content2));
    assert.ok(typeof text2 === 'string');
  });

  await it("utf8", async () => {
    const readable = new Readable();
    readable.push('Hello ');
    readable.push('World');
    readable.push('!');
    readable.push(null);
    const utf8 = await stream.utf8(readable);
    assert.strictEqual(utf8, 'Hello World!');
  });
});