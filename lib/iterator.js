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
  object: {
    *keys(obj) {
      for (const name in obj) {
        if (!Object.hasOwn(obj, name)) continue;
        yield name;
      }
    },
    *values(obj) {
      for (const name in obj) {
        if (!Object.hasOwn(obj, name)) continue;
        yield obj[name];
      }
    },
    *entries(obj) {
      for (const name in obj) {
        if (!Object.hasOwn(obj, name)) continue;
        yield [name, obj[name]];
      }
    }
  }
};
