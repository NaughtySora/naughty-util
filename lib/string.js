'use strict';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const lower = (s) => s.toLowerCase();
const upper = (s) => s.toUpperCase();

const valid = (data, length = 1) => typeof data === "string"
  && data.length >= length;

const WHITESPACES = /\s/gm;
const ASCII_DIGITS_LETTERS = /[^a-zA-Z0-9\-]/gm;
const MANY_HYPHENS = /\-{2,}/gm;
const START_END_HYPHEN = /^-+|-+$/;

const slug = (s) =>
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
