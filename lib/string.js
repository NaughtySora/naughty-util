'use strict';

const lower = Function.prototype.call.bind(String.prototype.toLowerCase);
const upper = Function.prototype.call.bind(String.prototype.toUpperCase);
const capitalize = s => upper(s.charAt(0)) + lower(s.slice(1));

const valid = (data, length = 1) => typeof data === "string"
  && data.length >= length;

const WHITESPACES = /\s/gm;
const ASCII_DIGITS_LETTERS = /[^a-zA-Z0-9\-]/gm;
const MANY_HYPHENS = /\-{2,}/gm;
const START_END_HYPHEN = /^-+|-+$/;

const slug = s =>
  s
    .trim()
    .replace(WHITESPACES, '-')
    .replace(ASCII_DIGITS_LETTERS, '')
    .replace(MANY_HYPHENS, '-')
    .replace(START_END_HYPHEN, '')
    .toLowerCase();

module.exports = {
  capitalize,
  lower,
  upper,
  slug,
  valid,
};
