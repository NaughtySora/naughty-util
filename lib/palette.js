'use strict';

const CLEAN = '\x1b[0m';

const COLORS = Object.freeze({
  __proto__: null,
  gray: '\x1b[1;30m',
  red: '\x1b[1;31m',
  green: '\x1b[1;32m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[1;34m',
  purple: '\x1b[1;35m',
  cyan: '\x1b[1;35m',
  white: '\x1b[1;37m',
});

const dye = (color, text) => `${color}${text}${CLEAN}`;

module.exports = {
  COLORS,
  CLEAN,
  dye,
};
// new