'use strict';

const toLowerCamel = s => s.charAt(0).toLowerCase() + s.slice(1);
const toUpperCamel = s => s.charAt(0).toUpperCase() + s.slice(1);
const toLower = s => s.toLowerCase();
const toUpper = s => s.toUpperCase();

const WHITESPACES = /\s/gm;
const ASCII_DIGITS_LETTERS = /[^\w]/gm;
const toSlug = s => s
  .replace(WHITESPACES, "-")
  .replace(ASCII_DIGITS_LETTERS, "");

module.exports = {
  toLowerCamel,
  toUpperCamel,
  toLower,
  toUpper,
  toSlug,
};