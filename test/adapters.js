'use strict';

const { adapters } = require('../main.js');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe("adapters", async () => {
  it("once", () => {
    const fn = () => 42;
    const wrapper = adapters.once(fn);
    assert.strictEqual(wrapper(), fn());
    assert.strictEqual(wrapper(), undefined);
    assert.strictEqual(wrapper(), undefined);
    const errored = () => {
      throw new Error("Error: once");
    };
    const errWrapper = adapters.once(errored);
    assert.throws(errWrapper, { message: "Error: once" });
    assert.strictEqual(errWrapper(), undefined);
    assert.strictEqual(errWrapper(), undefined);
  });
  // it("asyncify", () => {
  //   adapters.asyncify
  // });
  // it("callbackify", () => {
  //   adapters.callbackify
  // });
  // await describe("cancellable", async () => {
  //   it("async", () => {
  //     adapters.cancellable.async
  //   });
  //   it("sync", () => {
  //     adapters.cancellable.sync
  //   });
  // });
  // it("count", () => {
  //   adapters.count
  // });
  // it("", () => {
  //   adapters.debounce
  // });
  // it("", () => {
  //   adapters.limit
  // });
  // await describe("", async () => {
  //   it("async", () => {
  //     adapters.logify.async
  //   });
  //   it("sync", () => {
  //     adapters.logify.sync
  //   });
  // });

  // it("promisify", () => {
  //   adapters.promisify
  // });
  // it("scoped", () => {
  //   adapters.scoped
  // });
  // it("throttle", () => {
  //   adapters.throttle
  // });
  // it("timeout", () => {
  //   adapters.timeout
  // });
});