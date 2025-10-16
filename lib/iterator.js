'use strict';

const { enumerate, range } = require("./misc.js");

function* pick(seq, key) {
  for (const i of seq) yield i[key];
}

function* limit(seq, limit) {
  for (const i of seq) {
    if (limit-- <= 0) return;
    yield i;
  }
}

module.exports = {
  enumerate,
  range,
  pick,
  limit,
};
