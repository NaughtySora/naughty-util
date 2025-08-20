'use strict';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const lower = (s) => s.toLowerCase();
const upper = (s) => s.toUpperCase();

const WHITESPACES = /\s/gm;
const ASCII_DIGITS_LETTERS = /[^a-zA-Z0-9\-]/gm;
const MANY_DASHED = /\-{2,}/gm;

const slug = (s) =>
  s
    .trim()
    .replace(WHITESPACES, '-')
    .replace(ASCII_DIGITS_LETTERS, '')
    .replace(MANY_DASHED, '-')
    .toLowerCase();

module.exports = {
  capitalize,
  lower,
  upper,
  slug,
};
