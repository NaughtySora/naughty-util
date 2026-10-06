'use strict';

const { once } = require('node:events');
const { PassThrough } = require('node:stream');

const read = async readable => {
  const buffers = [];
  readable.on('data', buffer => void buffers.push(buffer));
  await once(readable, 'end');
  return Buffer.concat(buffers);
};

const utf8 = async readable => (await read(readable)).toString("utf8");

const tee = source => {
  const a = new PassThrough();
  const b = new PassThrough();
  source.pipe(a);
  source.pipe(b);
  return [a, b];
};

module.exports = {
  read,
  utf8,
  tee,
};
