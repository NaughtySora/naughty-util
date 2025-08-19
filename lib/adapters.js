'use strict';

const { promisify, pause } = require('./async.js');

const once = fn => (...args) => {
  if (fn === null) return;
  try {
    return fn(...args);
  } catch (e) {
    throw e;
  } finally {
    fn = null;
  }
};

const limit = (fn, count,) => (...args) =>
  count === 0 ? undefined : (count--, fn(...args));

const timeout = (fn, ms,) => {
  let timer = setTimeout(() => void (timer = null, fn = null), ms);
  return (...args) => fn === null ? undefined : fn(...args);
};

const debounce = (fn, ms) => {
  let timer = null;
  let params = null;
  let disposed = false;
  const inner = (...args) => {
    if (disposed) {
      throw new Error("debounce wrapper has been disposed");
    }
    if (timer !== null) return void (params = args);
    timer = setTimeout(() => {
      fn(...params);
      timer = null;
    }, ms);
  };
  Object.defineProperty(inner, Symbol.dispose, {
    value() {
      if(disposed) return;
      disposed = true;
      timer[Symbol.dispose]();
      timer = null;
    },
    enumerable: false,
  })
  return inner;
};

const throttle = (fn, ms, count,) => {
  const initial = count;
  let timer = setTimeout(() => {
    count = initial;
    timer.refresh();
  }, ms);
  const inner = (...args) => {
    if (timer === null) {
      throw new Error("throttle wrapper has been disposed");
    }
    if (count-- === 0) return;
    return fn(...args);
  };
  Object.defineProperty(inner, Symbol.dispose, {
    value() {
      if (timer === null) return;
      timer[Symbol.dispose]();
      timer = null;
    },
    enumerable: false,
  });
  return inner;
};

const scoped = (entity, onDispose) => {
  if (typeof onDispose !== "function") {
    throw new Error('scoped adapter requires onDispose function');
  }
  Object.defineProperty(entity, Symbol.dispose, {
    value: () => onDispose(entity),
    enumerable: false,
  });
  return entity;
};

const count = fn => {
  const inner = (...args) =>
    (inner.counter++, fn(...args));
  inner.counter = 0;
  return inner;
};

const callbackify = asyncFn => {
  return (...args) => {
    const callback = args.pop();
    asyncFn(...args)
      .then(
        data => callback(null, data),
        err => callback(err, null),
      );
  };
};

const asyncify = fn => async (...args) => {
  await pause(0);
  return fn(...args);
};

const sync = (fn, options = {}) => (...args) => {
  const { logger = console, suppress = true, } = options;
  try {
    logger.info('logable/before ', { args, fn, suppress, });
    const result = fn(...args);
    logger.log('logable/after::success ', { result, });
    return result;
  } catch (error) {
    logger.error('logable/after::error ', { error, });
    if (suppress) return;
    throw error;
  }
};

const async = (fn, options = {}) => async (...args) => {
  const { logger = console, suppress = true, } = options;
  try {
    logger.info('logable/before ', { args, fn, suppress, });
    const result = await fn(...args);
    logger.log('logable/after::success ', { result, });
    return result;
  } catch (error) {
    logger.error('logable/after::error ', { error, });
    if (suppress) return;
    throw error;
  }
};

const abort = () => { throw new Error('aborted'); };
const cancellable = (fn, { signal } = {}) => {
  return async (...args) => {
    signal.addEventListener('abort', abort, { once: true });
    const result = await fn(...args);
    signal.removeEventListener('abort', abort);
    return result;
  };
};

const cancellableSync = fn => {
  const inner = (...args) => {
    if (fn === null) return;
    return fn(...args);
  };
  inner.cancel = () => (fn = null);
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
  logify: {
    async,
    sync,
  },
  cancellable: {
    sync: cancellableSync,
    async: cancellable,
  },
};
