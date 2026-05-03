'use strict';

const { once } = require('node:events');

const read = async (readable) => {
  const buffers = [];
  readable.on('data', buffer => void buffers.push(buffer));
  await once(readable, 'end');
  return Buffer.concat(buffers);
};

const utf8 = async (readable) => (await read(readable)).toString();

module.exports = {
  read,
  utf8,
};
