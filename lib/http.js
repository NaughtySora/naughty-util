
'use strict';

const parseHost = (host) => {
  if (!host) return "";
  const offset = host.indexOf(':');
  offset > -1 ? host.substr(0, offset) : "";
};

const parseCookies = (cookie) => {
  const values = {};
  const elements = cookie.split(';');
  for (const element of elements) {
    const [key, val = ''] = element.split('=');
    values[key.trim()] = val.trim();
  }
  return values;
};

const createParams = (params) => {
  const parsed = new URLSearchParams(params).toString();
  return parsed ? `?${parsed}` : parsed;
};

const parseParams = (params) => Object.fromEntries(new URLSearchParams(params));

const originCheck = (headers, allowed = []) => {
  const origin = headers.origin;
  if (!origin) return false;
  if (Array.isArray(allowed) && !allowed.length) return true;
  return allowed.includes(origin);
};

const MOCK = "http://localhost";
const parseURL = path => new URL(`${MOCK}${path.trim()}`);

module.exports = {
  parseCookies,
  parseHost,
  parseParams,
  originCheck,
  parseURL,
  createParams,
};
