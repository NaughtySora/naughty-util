"use strict";

const id = x => x;

function Monad(x) {
  this.x = x;
}

Monad.prototype.map = function (fn = id) {
  const res = fn(this.x);
  return res instanceof Monad ? res : new Monad(res);
}

Monad.prototype.use = function (m) {
  return this.map(x => m.map(fn => fn(x)));
}

Monad.prototype.chain = function (f) {
  return f(this.x);
}

Monad.prototype.take = function (f) {
  f(this.x);
  return this;
}

function Functor(x) {
  this.x = x;
}

Functor.prototype.map = function (fn = id) {
  const res = fn(this.x);
  return res instanceof Functor ? res : new Functor(res);
}

Functor.prototype.take = function (f) {
  f(this.x);
  return this;
}

const inRange = (value, min, max) => value >= min && value <= max;

module.exports = {
  id,
  monad: x => new Monad(x),
  functor: x => new Functor(x),
  inRange,
};
