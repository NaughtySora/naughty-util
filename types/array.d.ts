import { Callback } from "./shared";

export interface UtilsArray {
  valid(data: any, length?: number): data is Array<any>;
  /**
   * Bind keys to specific indexes of the array.
   * @example
   * const array = [1,2,3];
   * accessor(array, { three: 2, one: 0, two: 1, });
   * array.one; // 1
   * array.two; // 2
   * array.three; // 3
   */
  accessor<T extends Array<any>, K extends (string | symbol), A extends number>(array: T, meta: Record<K, A>): T & Record<K, T[A]>;
  /**
   * Shuffles elements of the array using Fisher Yates algorithm.
   */
  shuffle<T extends Array<any>>(array: T): T;
  /**
   * Returns non crypto random element of the array.
   */
  sample<T extends any>(array: Array<T>): T;
  /**
   * @example
   * avg([{ value: 42 }, { value: 8 }], x => x.value); // 25
   */
  avg<T extends any>(array: Array<T>, callback: Callback): number;
  /**
   * @example
   * max([{ value: 42 }, { value: 8 }], x => x.value); // 42
   */
  max<T extends any>(array: Array<T>, callback: Callback): number;
  /**
   * @example
   * min([{ value: 42 }, { value: 8 }], x => x.value); // 8
   */
  min<T extends any>(array: Array<T>, callback: Callback): number;
  /**
   * @example
   * sum([{ value: 42 }, { value: 8 }], x => x.value); // 50
   */
  sum<T extends any>(array: Array<T>, callback: Callback): number;
  /**
   * @example
   * swap([1, 2, 3, 4], 0, 3); // [4, 2, 3, 1]
   */
  swap<T extends any>(array: Array<T>, i: number, j: number): void;
}
