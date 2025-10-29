'use strict';

const { STATUS_CODES } = require('node:http');

const WHITESPACE = /\s/;
const NOT_ASCII_LETTERS = /[^a-zA-Z]/g;

const CODES = Object.create(null);

for (const code in STATUS_CODES) {
  const text = STATUS_CODES[code];
  const words = text.split(WHITESPACE);
  let key = words.shift().replace(NOT_ASCII_LETTERS, '').toLowerCase();
  for (const word of words) {
    key += word.replace(NOT_ASCII_LETTERS, '');
  }
  CODES[key] = parseInt(code, 10);
  CODES[code] = text;
}

module.exports = Object.freeze(CODES);
