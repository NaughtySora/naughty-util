import { Callback, CallbackAsync } from "./shared";
import { UtilsAsync } from "./async";

type Wrapper<F extends Callback> = (...args: Parameters<F>) => ReturnType<F>;
type AsyncWrapper<F extends Callback> = (...args: Parameters<F>) => Promise<ReturnType<F>>;
type ErrBack = (err: typeof Error | null, data: any) => void;

type GetFields<Target, Keys extends (keyof Target)[]> = Pick<Target, Keys[number]>;
type Disposable<R> = { [Symbol.dispose](): R };
interface LogableOptions {
  logger?: GetFields<Console, ["info", "error", "log"]>;
  suppress?: boolean;
}

interface CancellableOptions {
  signal: AbortSignal,
}

export interface UtilsAdapters {
  /**
   * @example
   * const fn = once(() => 1);
   * fn() // 1
   * fn() // undefined
   */
  once<F extends Callback>(fn: F): Wrapper<F>,
  /**
   *
   * @example
   * const fn = limit(() => 1, 2);
   * fn() // 1
   * fn() // 1
   * fn() // undefined
   */
  limit<F extends Callback>(fn: F, count: number,): Wrapper<F>,
  /**
   * After N time function will return undefined instead of result.
   */
  timeout<F extends Callback>(fn: F, ms: number,): Wrapper<F>,
  /**
   * Function execution set to be called after N time every time its called.\
   * Disposable, can be used with "using" or fn[Symbol.dispose](), throws if called after.
   * @example
   * const fn = debounce(console.log.bind("call"), 1000);
   * fn(); // fn set to be called after 1000 ms
   * // wait 100 ms
   * fn(); // postponed on 1000 ms again
   * // wait 1000 ms
   * // logs "call"
   */
  debounce<F extends Callback>(fn: F, ms: number,): Wrapper<F> & Disposable<void>,
  /**
   * Limits function for K calls per N time.
   */
  throttle<F extends Callback>(fn: F, ms: number, count: number,): Wrapper<F> & Disposable<void>,
   /**
   * Adds Symbol.dispose which makes it compatible with "using",\
   * DisposableStack and calling entity[Symbol.Dispose]().
   */
  scoped<E extends object>(entity: E, onDispose: (entity: E) => any): E & Disposable<ReturnType<typeof onDispose>>,
  /**
   * Adds counter field to the function and increments it every call.
   * @example
   * const fn = count(() => 1);
   * fn.counter; // 0
   * fn();
   * fn.counter; // 1
   */
  count<F extends Callback>(fn: F): Wrapper<F> & { counter: number },
  /**
   * Adapts contract callback last, error first (errback)
   * to use promise.
   * @example
   * const fs = require("node:fs");
   * const fn = promisify(fs.readFile);
   * await fn(__filename); // buffer
   * await fn(__filename, "utf8"); // string
   */
  promisify: UtilsAsync["promisify"],
  /**
   * Makes synchronous function asynchronous by waiting for Settimeout 0.
   */
  asyncify<F extends Callback>(fn: F): AsyncWrapper<F>,
  /**
   * Adapts function that returns thenable to use contract errback.
   * @example
   * const fn = callbackify(async () => 1);
   * fn((err, data) => {}); // err = null, data = 1
   */
  callbackify<F extends CallbackAsync>(fn: F): (...args: Parameters<F> & { callback: ErrBack }) => void,
  logify: {
    /**
     * Adds log call after, before execution and on error\
     * options allow to suppress error, add custom logger.
     */
    async<F extends CallbackAsync>(fn: F, options?: LogableOptions): AsyncWrapper<F>,
    /**
     * Adds log call after, before execution and on error\
     * options allow to suppress error, add custom logger.
     */
    sync<F extends Callback>(fn: F, options?: LogableOptions): Wrapper<F>,
  },
  cancellable: {
    /**
     * Uses signal to cancel (forget) the result of the execution.\
     * To really cancel async operation, use original function specific api.
     */
    async<F extends CallbackAsync>(fn: F, options: CancellableOptions): AsyncWrapper<F>,
    /**
     * Adds cancel method to the function, allows to prevent further
     * function execution.
     */
    sync<F extends Callback>(fn: F): Wrapper<F> & { cancel(): void },
  },
}
