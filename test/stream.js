"use strict";
const assert = require("node:assert");
const test = require("./test");
const { stream } = require("../main");
const { Readable } = require("node:stream");
const fs = require("node:fs");

const read = async () => {
  const readable = new Readable();
  readable.push("Hello ");
  readable.push("World");
  readable.push("!");
  readable.push(null);
  
  const content = await stream.read(readable);
  const text = content.toString();
  assert.equal(Buffer.isBuffer(content), true);
  assert.equal(text, "Hello World!");

  const file = fs.createReadStream(__filename);
  const content2 = await stream.read(file);
  const text2 = content.toString();
  assert.equal(Buffer.isBuffer(content2), true);
  assert.equal(typeof text2 === "string", true);
};

test.async([read], "stream");