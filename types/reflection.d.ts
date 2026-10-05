import { UtilsArray } from "./array";

type NonNullablePrimitive = string | number | boolean |
  bigint | symbol | undefined;

type Falsy = false | 0 | -0 | 0n | "" | null | undefined | typeof NaN;

type NonArrayObject<T> = Extract<T, object> extends infer O
  ? (O extends readonly unknown[] ? never : O)
  : never;

export interface UtilsReflection {
  /**
   * @example
   * class A { }
   * isClass(A) // true
   * @example
   * function B {}
   * isClass(B) // false
   */
  isClass<C extends new (...args: any[]) => any>(entity: any): entity is C;
  /**
   * @example
   * isEmpty({}) // false
   * @example
   * isEmpty(null) // true
   * isEmpty(undefined) // true
   */
  isEmpty<E extends (null | undefined)>(entity: any): entity is E;
  /**
   * @example
   * isPrimitive(1) // true
   * isPrimitive("string") // true
   * isPrimitive(String(1n)) // true
   * @example
   * isPrimitive(new String("a")) // false
   * isPrimitive({}) // false
   */
  isPrimitive(entity: any): entity is NonNullablePrimitive;
  /**
   * @example
   * isComplex(1) // false
   * isComplex("string") // false
   * isComplex(String(1n)) // false
   * @example
   * isComplex(new String("a")) // true
   * isComplex({}) // true
   */
  isComplex(entity: any): entity is (object | Function);
  /**
   * false | 0 | -0 | 0n | "" | null | undefined | NaN
   * @example
   * isFalsy(NaN) // true
   * isFalsy("") // true
   * isFalsy(0) // true
   * @example
   * isFalsy(1) // false
   * isFalsy("hello") // false
   */
  isFalsy<T extends any>(entity: T): entity is Exclude<T, Falsy>;
  /**
   * Errors from different environments might not work
   * @example
   * class E extends Error {}
   * isError(new Error()) // true
   * isError(new E()) // true
   * @example
   * isError("error") // false
   * isError({}) // false
   */
  isError(entity: any): entity is InstanceType<typeof Error>;
  /**
   * @example
   * isAsyncFunction(async () => { }) // true
   * @example
   * isAsyncFunction(() => { }) // false
   */
  isAsyncFunction<A extends (...args: any[]) => Promise<any>>(entity: any): entity is A;
  /**
  * Not targeting arrays,
  * object extended from an array will not work.
  * @example
  * isObject({}) // true
  * isObject(new Map()) // true
  * isObject(new Set()) // true
  * @example
  * class A extends Array {}
  * isObject([]) // false
  * isObject(new A()) // false
  */
  isObject<T extends any>(entity: T): entity is NonArrayObject<T> & T;
  /**
  * accepts only { } or { \_\_proto\_\_: null }
  */
  isPlainObject(entity: unknown): boolean;
  /**
  * shortcut for Array.isArray(entity) && entity.length >= N\
  * default N is 1
  * @example
  * isArray([]) // false
  * isArray([], 0) // true
  * isArray([1,2,3]) // true
  * isArray([1,2,3], 5) // false
  */
  isArray: UtilsArray["valid"];
  /**
  * Get constructor of the target
  * @example
  * ctor(1) // Number
  * ctor("") // String
  * ctor({}) // Object
  * ctor(new Set()) // Set
  * ctor(async () => {}) // AsyncFunction
  */
  ctor(entity: any): Function;
  /**
  * Will show full content of the object and
  * hidden fields.
  *
  * Uses node util inspector with following options:\
  * depth: Infinity\
  * maxArrayLength: Infinity\
  * maxStringLength: Infinity
  */
  inspect(item?: any): void;
  /**
  * The same as inspect but shows hidden fields.
  */
  expose(item?: any): void;
}

