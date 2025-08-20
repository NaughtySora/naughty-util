'use strict';

const { adapters, misc, async } = require('../main.js');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe("adapters", async () => {
  it("once", () => {
    const fn = () => 42;
    const wrapper = adapters.once(fn);
    assert.strictEqual(wrapper(), fn());
    assert.strictEqual(wrapper(), undefined);
    assert.strictEqual(wrapper(), undefined);
    const message = "Error: once";
    const errWrapper = adapters.once(() => { throw new Error(message); });
    assert.throws(() => errWrapper(), { message });
    assert.strictEqual(errWrapper(), undefined);
    assert.strictEqual(errWrapper(), undefined);
  });

  it("limit", () => {
    const fn = () => 42;
    const LIMIT = 5;
    const wrapper = adapters.limit(fn, LIMIT);
    Iterator.prototype.forEach.call(
      misc.range(LIMIT, 1),
      () => assert.strictEqual(wrapper(), fn()),
    );
    assert.strictEqual(wrapper(), undefined);
    const message = "Error: limit";
    const err = () => { throw new Error(message); }
    const errWrapper = adapters.limit(err, LIMIT);
    Iterator.prototype.forEach.call(
      misc.range(LIMIT, 1),
      () => assert.throws(() => errWrapper(), { message }),
    );
    assert.strictEqual(errWrapper(), undefined);
  });

  await it("timeout", async () => {
    const fn = () => 42;
    const WAIT = 500;
    const wrapper = adapters.timeout(fn, WAIT);
    assert.strictEqual(wrapper(), fn());
    await async.pause(WAIT);
    assert.strictEqual(wrapper(), undefined);

    const message = "Error: timeout";
    const err = () => { throw new Error(message); };
    const errWrapper = adapters.timeout(err, WAIT);
    assert.throws(() => errWrapper(), { message });
    await async.pause(WAIT);
    assert.strictEqual(errWrapper(), undefined);
  });

  await it("debounce", async () => {
    const THRESHOLD = 1000;
    const every = Math.floor(THRESHOLD / 4);
    let result = 0;
    const wrapper = adapters.debounce((i) => void (result = i), THRESHOLD);
    for (const i of misc.range(THRESHOLD, 0, every)) {
      wrapper(i);
      await async.pause(every);
    }
    assert.strictEqual(result, THRESHOLD - every);
    wrapper[Symbol.dispose]();
    assert.throws(() => {
      wrapper();
    }, { message: "debounce wrapper has been disposed" });
  });

  await describe("throttle", async () => {
    const test = {
      value: 42,
      method1() {
        return this.value;
      },
    };
    const WAIT = 1000;
    const LIMIT = 10;
    const wrapper = adapters.throttle(test.method1.bind(test), WAIT, LIMIT);
    Iterator.prototype.forEach.call(
      misc.range(LIMIT, 1),
      () => {
        assert.strictEqual(wrapper(), test.method1())
      },
    );
    assert.strictEqual(wrapper(), undefined);
    await async.pause(WAIT);
    Iterator.prototype.forEach.call(
      misc.range(LIMIT, 1),
      () => assert.strictEqual(wrapper(), test.method1()),
    );
    assert.strictEqual(wrapper(), undefined);

    wrapper[Symbol.dispose]();
    assert.throws(() => {
      wrapper();
    }, { message: "throttle wrapper has been disposed" });

    it("using Node >= 24", () => {
      let wrap = null;
      {
        const fn = () => 42;
        using wrapper = adapters.throttle(fn, WAIT, LIMIT);
        wrap = wrapper;
      }
      assert.throws(() => {
        wrap();
      }, { message: "throttle wrapper has been disposed" });
    })
  });

  it("scoped", () => {
    const fn = () => null;
    const scoped = adapters.scoped(fn, (fn) => fn.scoped = true);
    assert.strictEqual(scoped.scoped, undefined);
    { using s = scoped; }
    assert.strictEqual(scoped.scoped, true);

    const test = {
      value: 42,
      method1() {
        return this.value;
      },
    };
    const scoped2 = adapters.scoped(test, (obj) => obj.value = 0);
    assert.strictEqual(scoped2.value, test.value);
    { using s = scoped2; }
    assert.strictEqual(scoped2.value, 0);

    const fn2 = () => null;
    {
      const scoped = adapters.scoped(fn2, (fn2) => fn2.test = 42);
      assert.strictEqual(scoped.test, undefined);
      scoped[Symbol.dispose]();
      assert.strictEqual(scoped.test, 42);
    }

    const test2 = {
      value: 42,
      method1() {
        return this.value;
      },
    };
    {
      const scoped2 = adapters.scoped(test2, (obj) => obj.value2 = obj.value);
      assert.strictEqual(scoped2.value2, undefined);
      scoped2[Symbol.dispose]();
      assert.strictEqual(scoped2.value2, scoped2.value);
    }

    assert.throws(() => {
      adapters.scoped({});
    }, { message: "scoped adapter requires onDispose function" });

    assert.throws(() => {
      adapters.scoped({}, { test() { } });
    }, { message: "scoped adapter requires onDispose function" });
  });

  it("count", () => {
    const fn = () => 42;
    const wrapper = adapters.count(fn);
    assert.strictEqual(wrapper.counter, 0);
    wrapper();
    wrapper();
    assert.strictEqual(wrapper.counter, 2);
    wrapper();
    wrapper();
    assert.strictEqual(wrapper.counter, 4);
  });

  await it("callbackify", async () => {
    const fn = async (x) => {
      await async.pause(500);
      return 42 + x;
    };
    const wrapper = adapters.callbackify(fn);
    wrapper(8, (err, data) => {
      assert.deepStrictEqual(err, null);
      assert.strictEqual(data, 50);
    });
    const error = new Error("Error");
    const fn2 = async () => {
      throw error;
    };
    const wrapper2 = adapters.callbackify(fn2);
    wrapper2((err, data) => {
      assert.deepStrictEqual(err, error);
      assert.strictEqual(data, null);
    });
  });

  await it("asyncify", async () => {
    const fn = (x) => 42 + x;
    const wrapper = adapters.asyncify(fn);
    const result = await wrapper(8);
    assert.strictEqual(result, 50);
  });

  await describe("logify", async () => {
    it("sync", () => {
      const fn = (x) => 42 + x;
      const wrapper = adapters.logify.sync(fn, {
        logger: {
          info(log, data) {
            assert.strictEqual(log, "logable/before ");
            assert.deepStrictEqual(data, { args: [8], suppress: true, fn });
          },
          log(log, data) {
            assert.strictEqual(log, "logable/after::success ");
            assert.deepStrictEqual(data, { result: 50 });
          }
        }
      });
      wrapper(8);
      const error = new Error("error");
      const err = () => {
        throw error;
      };
      const errWrapper = adapters.logify.sync(err, {
        logger: {
          info(log, data) {
            assert.strictEqual(log, "logable/before ");
            assert.deepStrictEqual(data, { args: [], suppress: true, fn: err });
          },
          error(log, data) {
            assert.strictEqual(log, "logable/after::error ");
            assert.deepStrictEqual(data, { error });
          },
        }
      });
      errWrapper();

      const throws = adapters.logify.sync(err, {
        suppress: false,
        logger: { info() { }, log() { }, error() { } }
      },);
      assert.throws(throws, { message: error.message });
    });

    await it("async", async () => {
      const fn = async (x) => {
        await async.pause(10);
        return 42 + x;
      };
      const wrapper = adapters.logify.async(fn, {
        logger: {
          info(log, data) {
            assert.strictEqual(log, "logable/before ");
            assert.deepStrictEqual(data, { args: [8], suppress: true, fn });
          },
          log(log, data) {
            assert.strictEqual(log, "logable/after::success ");
            assert.deepStrictEqual(data, { result: 50 });
          }
        }
      });
      await wrapper(8);
      const error = new Error("error");
      const err = () => { throw error; };
      const errWrapper = adapters.logify.async(err, {
        logger: {
          info(log, data) {
            assert.strictEqual(log, "logable/before ");
            assert.deepStrictEqual(data, { args: [], suppress: true, fn: err });
          },
          error(log, data) {
            assert.strictEqual(log, "logable/after::error ");
            assert.deepStrictEqual(data, { error });
          },
        }
      });
      await errWrapper();

      const throws = adapters.logify.async(err, {
        suppress: false,
        logger: { info() { }, log() { }, error() { } }
      },);
      assert.rejects(async () => await throws(), { message: error.message });
    });
  });

  await describe("cancellable", async () => {
    await describe("async", async () => {
      await it("signal/timeout", async () => {
        const fn = async () => {
          await async.pause(200);
          return 42;
        };
        const signal = AbortSignal.timeout(120);
        const wrapper = adapters.cancellable.async(fn, { signal });
        await assert.rejects(async () => {
          await wrapper();
          throw new Error("never reached");
        }, { message: "aborted" });
      });

      await it("signal/manually", async () => {
        const fn = async () => {
          await async.pause(200);
          return 42;
        };

        const controller = new AbortController();
        const signal = controller.signal;
        const wrapper = adapters.cancellable.async(fn, { signal: signal });

        setTimeout(() => { controller.abort(); }, 50);

        await assert.rejects(async () => {
          await wrapper();
          throw new Error("never reached");
        }, { message: "aborted" });
      });

      await it("error", async () => {
        const fn = async () => {
          await async.pause(200);
          throw new Error("Error: cancellable");
        };

        const signal = AbortSignal.timeout(1000);
        const wrapper = adapters.cancellable.async(fn, { signal: signal });
        await assert.rejects(async () => {
          await wrapper();
          throw new Error("never reached");
        }, { message: "Error: cancellable" });
      });
    });

    it("sync", () => {
      const fn = () => 42;
      const wrapper = adapters.cancellable.sync(fn);
      assert.strictEqual(wrapper(), fn());
      assert.strictEqual(wrapper(), fn());
      wrapper.cancel();
      assert.strictEqual(wrapper(), undefined);
    });
  });

  // it("promisify", () => {
  //   adapters.promisify
  // });

});

