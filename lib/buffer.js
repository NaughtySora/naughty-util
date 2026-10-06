'use strict';

const { randomFill } = require('node:crypto');
const { thenable } = require('./async.js');

const random = (length = 1024) =>
  thenable(randomFill, Buffer.allocUnsafe(length));

module.exports = {
  random,
};
