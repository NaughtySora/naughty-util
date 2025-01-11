'use strict';
const { randomFill } = require("node:crypto");
const async = require("./async");

const random = (length = 1024) => async.thenable(randomFill, Buffer.allocUnsafe(length));

const read = async (readable) => {
  const result = [];
  for await (const chuck of readable) result.push(chuck);
  return Buffer.concat(result);
};

module.exports = {
  random,
  read,
};
