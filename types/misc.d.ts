import { Callback } from "./shared";

type Key = <K extends string[]>(...keys: K) => K extends [] ? string : Key;

type Curry = <
  F extends (...args: any[]) => any,
  A extends Partial<Parameters<F>>>(fn: F) => (...args: A) =>
    A extends [] ? ReturnType<F> : Curry;

export interface UtilsMisc {
  id<T>(entity: T): T;
  inRange<T extends string | number>(value: T, min: T, max: T): boolean;
  compose<F extends Callback>(...fns: F[]): (...params: Parameters<F>) => any;
  range(end: number, start?: number, step?: number): Generator<number>;
  /**
   * shortcut for fn.bind(null, ...args)
   * @example
   * const max = (a, b) => a >= b ? a : b;
   * const bounded = partial(max, 42);
   * bounded(37); // 42
   * bounded(125); // 125
   */
  partial<F extends Callback>(fn: F, ...params: Partial<Parameters<F>>): (...params: any) => any;
  /**
   * data projection
   * @example
   * const person = {
   *   name: 'John Doe',
   *   age: 33,
   *   phone: 123456123,
   * };
   * const meta = [
   *   ['name', undefined, x => x.toLowerCase()],
   *   ['phone', 'mobile']
   * ];
   * projection(meta, person) // { name: 'john doe', mobile: 123456123 };
   */
  projection<T extends [string, string | T, Callback], O extends object>(meta: T[], data: O): any;
  /**
   * enumerate iterable sequence
   * @example
   * const arr = [1,2,3];
   * for(const entry of enumerate(arr)) {
   *  entry[0] // array element
   *  entry[1] // index
   * }
   */
  enumerate<T>(iterable: Iterable<T>): Generator<[T, number]>;
  /**
   * random integer generated based on Math.random()\
   * doesn't provide crypto safe random generator
   */
  random(max: number, min?: number): number;
  /**
   * measures time with high resolution time
   * @example
   * const end = timestamp();
   * // do work
   * const { nanosecond } = end();
   */
  timestamp(): () => { nanoseconds: bigint, seconds: number };
  /**
   * non-crypto random sequence of characters\
   * Usually for quick testing, prototyping, etc
   */
  unique(): string;
  /**
   * precurried (...args) => args.join(":");
   * @example
   * const redisKey = key("redis");
   * redisKey() // "redis"
   * redisKey("session", "abc")() // "redis:session:abc"
   */
  key: Key;
  /**
   * Creates new function each time calls with parameters
   * @example
   * const a = (a,b,c) => a+b+c;
   * const curried = curry(a);
   * const bounded = curry('a', 'b');
   * const result = bounded('c', 'e')(); // e ignored cause only 3 parameters
   * // result is "abc"
   */
  curry: Curry;
}
