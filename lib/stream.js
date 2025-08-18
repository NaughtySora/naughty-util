'use strict';

const read = async (readable) => {
  const buffers = [];
  for await (const chuck of readable) buffers.push(chuck);
  return Buffer.concat(buffers);
};

const blob = async stream => new Blob(await read(stream));

const utf8 = async stream => (await read(stream)).toString();

module.exports = {
  read,
  blob, // new
  utf8, // new
};
