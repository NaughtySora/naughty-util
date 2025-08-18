'use strict';

const once = fn => (...args) => fn === null ? undefined : (fn = null, fn.apply(fn, args));
const limit = (count, fn, ...args) => () => count === 0 ? undefined : (count--, fn.apply(fn, args));
const timeout = (ms, fn, ...args) => {
  let timer = setTimeout(() => void (timer = null, fn = null), ms);
  return () => fn ? fn.apply(fn, args) : undefined;
};
const debounce = (ms, fn) => {
  let timer = null;
  let params = null;
  return (...args) => {
    if (timer !== null) return void (params = args);
    timer = setTimeout(() => {
      fn.apply(fn, params);
      timer = null;
    }, ms);
  };
};
const throttle = (ms, count, fn) => {
  const initial = count;
  let timer = setTimeout(() => {
    count = initial;
    timer.refresh();
  }, ms);
  const inner = (...args) => {
    if (count-- === 0) return;
    return fn.apply(fn, args);
  };
  Object.defineProperty(inner, Symbol.dispose, {
    enumerable: false,
    value: () => {
      timer[Symbol.dispose]();
      timer = null;
      if (nativeDispose !== undefined) {
        nativeDispose();
      }
    },
  });
  return inner;
};
const scoped = (entity, onDispose) => {
  Object.defineProperty(entity, Symbol.dispose, {
    value: () => onDispose(entity),
    enumerable: false,
  });
  return entity;
};
const count = fn => {
  const inner = (...args) =>
    (inner.counter++, fn.apply(fn, args));
  inner.counter = 0;
  return inner;
};

const cancellable = (fn) => {
  const inner = (...args) => {
    if (fn === null) return;
    return fn.apply(fn, ...args);
  };
  inner.cancel = () => (fn = null);
  return inner;
};
