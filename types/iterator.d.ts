import { UtilsMisc } from "./misc";

type ExcludeSymbol<Keys> = Exclude<Keys, symbol>;

export interface UtilsIterator extends Pick<UtilsMisc, "enumerate" | "range"> {
  /**
   * Picks specific field from item of a sequence.
   * @example
   * const seq = [{a: 1, b: 2}, {a: 3, b: 4}];
   * [...pick(seq, 'a')]; // [{a: 1}, {a: 3}]
   */
  pick<T extends object, K extends keyof T>(sequence: Iterable<T>, name: K): Generator<T[K]>;
  /**
   * Returns N items from a sequence.
   * @example
   * const seq = [1, 2, 3, 4, 5];
   * [...limit(seq, 3)]; // [1, 2, 3]
   */
  limit<T>(sequence: Iterable<T>, limit: number): Generator<T>;
  object: {
    /**
     * The same as Object.keys(obj) but iterator.
     */
    keys<O extends object>(obj: O): Generator<ExcludeSymbol<keyof O>>;
    /**
     * The same as Object.values(obj) but iterator.
     */
    values<O extends object>(obj: O): Generator<O[ExcludeSymbol<keyof O>]>;
    /**
     * The same as Object.entries(obj) but iterator.
     */
    entries<O extends object, Keys extends ExcludeSymbol<keyof O>>(obj: O): Generator<[Keys, O[Keys]]>;
  }
}

