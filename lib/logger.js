'use strict';

const { COLORS, dye } = require("./palette.js");

const { blue, green, red, yellow } = COLORS;

const intl = new Intl.DateTimeFormat(undefined,
  {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatDate = (date = new Date()) => intl.format(date);
const date = () => dye(blue, formatDate());

const LOG = dye(green, "[log]:");
const ERROR = dye(red, "[error]:");
const WARN = dye(yellow, "[warn]:");
const INFO = dye(blue, "[info]:");

module.exports = Object.freeze(Object.assign({}, console, {
  log(...logs) {
    console.log(LOG, date(), ...logs);
  },
  error(...logs) {
    console.log(ERROR, date(), ...logs);
  },
  warn(...logs) {
    console.log(WARN, date(), ...logs);
  },
  info(...logs) {
    console.log(INFO, date(), ...logs);
  },
}));
