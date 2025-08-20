'use strict';

const read = async (readable) => {
  const buffers = [];
  for await (const chuck of readable) buffers.push(chuck);
  return Buffer.concat(buffers);
};

const utf8 = async readable => (await read(readable)).toString();

module.exports = {
  read,
  utf8,
};
