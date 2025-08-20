import { Callback } from "./shared";

export interface UtilsArray {
  valid(data: any, length?: number): boolean;
  accessor<T extends Array<any>, K extends (string | symbol), A extends number>(array: T, meta: Record<K, A>): T & Record<K, T[A]>;
  shuffle<T extends Array<any>>(array: T): T;
  sample<T extends any>(array: Array<T>): T;
  avg<T extends any>(array: Array<T>, callback: Callback): number;
  max<T extends any>(array: Array<T>, callback: Callback): number;
  min<T extends any>(array: Array<T>, callback: Callback): number;
  sum<T extends any>(array: Array<T>, callback: Callback): number;
}
