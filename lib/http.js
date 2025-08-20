'use strict';

const { STATUS_CODES, } = require('node:http');

const parseHost = (host) => {
  if (!host) return 'no-host-name-in-http-headers';
  const portOffset = host.indexOf(':');
  if (portOffset > -1) host = host.substr(0, portOffset);
  return host;
};

const parseCookies = (cookie) => {
  const values = [];
  const items = cookie.split(';');
  for (const item of items) {
    const [key, val = ''] = item.split('=');
    values.push([key.trim(), val.trim()]);
  }
  return Object.fromEntries(values);
};

const createParams = (params) => {
  const parsed = new URLSearchParams(params).toString();
  return parsed ? `?${parsed}` : parsed;
};

const parseParams = (params) => Object.fromEntries(new URLSearchParams(params));

const ORIGIN = 'http://localhost';
const parseURL = pathname => {
  if (typeof pathname !== 'string' || !pathname.startsWith('/')) return null;
  return new URL(`${ORIGIN}${pathname.trim()}`);
};

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
};

module.exports = {
  parseCookies,
  parseHost,
  parseParams,
  parseURL,
  createParams,
  CODES: Object.freeze(CODES),
};
