interface Box<T> {
  unwrap(): T;
  valueOf(): string;
}

declare class Option<T> {
  unwrap(): T;
  valueOf(): string;
  from<V>(value: V): Option<V>;
  static from<T>(value: T): Option<T>;
}

declare class Result<T> {
  unwrap(): T;
  valueOf(): string;
  static from<T>(value: T): Result<T>;
}

export interface UtilsAbstract {
  /**
   * @example
   * const mapping = {
   *   sum: (a, b) => a + b,
   *   multi: (a, b) => a * b,
   *   pow: (base, power) => base ** power,
   * };
   * const strategy = factorify(mapping, mapping.pow);
   * strategy("sum")(1, 2); // 3
   * strategy()(2, 2); // 4, default pow
   * strategy("multi")(1, 2); // 2
   */
  factorify<T, N, K extends keyof T>(dataset: T, nullable?: N): (key: K) => T[K] | N;
  /**
   * Make factory from the Class / Prototype signature.
   * @example
   * const fn = factory(Array, 64);
   * fn(); // Array of 64 empty elements
   */
  factory<T extends { new(): any }>(Interface: T, ...params: ConstructorParameters<T>): () => InstanceType<T>;
  /**
   * Used together with pattern matching.
   */
  Option: typeof Option;
  /**
   * Used together with pattern matching.
   */
  Result: typeof Result;
  /**
   * Pattern matching.
   * @example
   * const result = new Result(16);
   * match(result, {
   *  "Ok": (v) => v, // 16
   *  "Err": () => { throw new Error("Should never reach") },
   * });
   */
  match: <T extends Box<any>, F extends Function> (entity: T, strategies: Record<string, F>) => any,
}
