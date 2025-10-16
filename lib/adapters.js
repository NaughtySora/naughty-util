'use strict';

const { promisify, pause } = require('./async.js');

const once = (fn) => (...args) => {
  if (fn === null) return;
  try {
    return fn(...args);
  } catch (e) {
    throw e;
  } finally {
    fn = null;
  }
};

const limit = (fn, count) =>
  (...args) => count === 0 ? undefined : (count--, fn(...args));

const timeout = (fn, ms) => {
  let timer = setTimeout(() => void ((timer = null), (fn = null)), ms);
  return (...args) => (fn === null ? undefined : fn(...args));
};

const debounce = (fn, ms) => {
  let timer = null;
  const inner = (...args) => {
    if (fn === null) {
      throw new Error('debounce wrapper has been disposed');
    }
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, ms);
  };
  Object.defineProperty(inner, Symbol.dispose, {
    value() {
      if (fn === null) return;
      fn = null;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    },
    enumerable: false,
  });
  return inner;
};

const throttle = (fn, ms, count) => {
  const initial = count;
  let timer = setTimeout(() => {
    count = initial;
    timer.refresh();
  }, ms);
  const inner = (...args) => {
    if (timer === null) {
      throw new Error('throttle wrapper has been disposed');
    }
    if (count-- === 0) return;
    return fn(...args);
  };
  Object.defineProperty(inner, Symbol.dispose, {
    value() {
      if (timer === null) return;
      clearTimeout(timer);
      timer = null;
    },
    enumerable: false,
  });
  return inner;
};

const scoped = (entity, onDispose) => {
  if (typeof onDispose !== 'function') {
    throw new Error('scoped adapter requires onDispose function');
  }
  Object.defineProperty(entity, Symbol.dispose, {
    value: () => onDispose(entity),
    enumerable: false,
  });
  return entity;
};

const count = (fn) => {
  const inner = (...args) => (inner.counter++, fn(...args));
  inner.counter = 0;
  return inner;
};

const callbackify = (asyncFn) => {
  return (...args) => {
    const callback = args.pop();
    asyncFn(...args).then(
      (data) => callback(null, data),
      (err) => callback(err, null),
    );
  };
};

const asyncify = (fn) => async (...args) => {
  await pause(0);
  return fn(...args);
};

const sync = (fn, options = {}) => (...args) => {
  const { logger = console, suppress = true } = options;
  try {
    logger.info('logable/before ', { args, fn, suppress });
    const result = fn(...args);
    logger.log('logable/after::success ', { result });
    return result;
  } catch (error) {
    logger.error('logable/after::error ', { error });
    if (suppress) return;
    throw error;
  }
};

const async = (fn, options = {}) => async (...args) => {
  const { logger = console, suppress = true } = options;
  try {
    logger.info('logable/before ', { args, fn, suppress });
    const result = await fn(...args);
    logger.log('logable/after::success ', { result });
    return result;
  } catch (error) {
    logger.error('logable/after::error ', { error });
    if (suppress) return;
    throw error;
  }
};

const cancellable = (fn, { signal } = {}) => {
  if (signal === undefined) {
    throw new Error('async cancellable requires a signal');
  }
  return (...args) =>
    new Promise((resolve, reject) => {
      const abort = () => void reject(new Error('aborted'));
      signal.addEventListener('abort', abort, { once: true });
      fn(...args)
        .then(resolve, reject)
        .finally(() => {
          signal.removeEventListener('abort', abort);
        });
    });
};

const cancellableSync = (fn) => {
  const inner = (...args) => (fn === null ? undefined : fn(...args));
  inner.cancel = () => void (fn = null);
  return inner;
};

module.exports = {
  once,
  limit,
  timeout,
  debounce,
  throttle,
  scoped,
  count,
  promisify,
  asyncify,
  callbackify,
  logify: { async, sync },
  cancellable: { async: cancellable, sync: cancellableSync },
};
