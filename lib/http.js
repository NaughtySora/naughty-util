'use strict';

const { valid } = require("./string.js");
const { isObject } = require("./reflection.js");

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
const parseURL = (pathname) => {
  if (typeof pathname !== 'string' || !pathname.startsWith('/')) return null;
  return new URL(`${ORIGIN}${pathname.trim()}`);
};

const query = (path, parameters) => {
  if(!valid(path)) return '';
  if (!isObject(parameters)) return path;
  const query = new URLSearchParams(parameters).toString();
  return `${path}${query ? '?' : ''}${query}`;
};

const DATA_URL_EXT = /^data:(?<mime>.+);base64,/;
const DATA_URL_EXT_REPLACE = /^data:.+;base64,/;

const dataUrl = {
  payload(url) {
    return url.replace(DATA_URL_EXT_REPLACE, "");
  },
  mime(url) {
    const matched = url.match(DATA_URL_EXT);
    if (matched === null) return "";
    return matched.groups.mime;
  },
  from(payload, mime) {
    return `data:${mime};base64,${payload}`;
  },
};

module.exports = {
  parseCookies,
  parseHost,
  parseParams,
  parseURL,
  createParams,
  query,
  dataUrl,
};
