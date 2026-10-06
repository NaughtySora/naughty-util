import { Callback, CallbackAsync } from "./shared";

export interface Thenable<T> {
  then(resolve: (data: T) => any, reject?: (err: any) => any): void;
}

export interface UtilsAsync {
  /**
   * Adapts contract callback last, error first (errback)
   * to use promise.
   * @example
   * const fs = require("node:fs");
   * const fn = promisify(fs.readFile);
   * await fn(__filename); // buffer
   * await fn(__filename, "utf8"); // string
   */
  promisify<F extends Callback>(fn: F): (...params: Parameters<F>) => any;
  /**
   * Async function composition left to right execution order.
   * @example
   * const f1 = async x => x.toLowerCase();
   * const f2 = async x => `text: ${x}`;
   * const composition = compose(f1, f2);
   * // f1 -> f2
   * await composition("Text Sample"); // "text: text sample"
   */
  compose<F extends CallbackAsync>(...fns: F[]): (...params: Parameters<F>) => Promise<any>;
  /**
   * Light-weight thenable.\
   * Doesn't have catch or finally methods.\
   * Doesn't return new thenable, can't be chained like Promise.
   * @example
   * const fs = require("fs:node");
   * await thenable(fs.readFile, __filename, 'utf-8'); // string
   */
  thenable<F extends Callback>(fn: F, ...params: Parameters<F>): Thenable<any>;
  /**
   * Wrapper around Settimeout using promise.
   * @example
   * await pause(0);
   */
  pause(ms: number): Promise<void>;
  /**
   * Parallel composition.
   * @example
   * const f1 = async (x) => x;
   * const f2 = async (x) => x * x;
   * const composition = parallel(f1, f2);
   * const [a, b] = await composition(123, 2);
   * a; // 123 => 123
   * b; // 2 => 2 * 2
   */
  parallel<F extends CallbackAsync>(...fns: F[]): (...params: Parameters<F>) => Promise<any>;
  /**
   * Reject after N time with default or custom error.
   * @example
   * await reject(1000, new Error("Custom message"));
   * @example
   * const disconnect = async () => {...};
   * await Promise.race([disconnect(), reject(1000)]);
   */
  reject(ms: number, error?: any): void;
  /**
   * Resolve after N time with undefined or value.
   * @example
   * await resolve(1000, "abc"); // "abc"
   * @example
   * const disconnect = async () => {...};
   * await Promise.race([disconnect(), resolve(1000)]);
   */
  resolve<V extends any>(ms: number, value: V): V;
}
