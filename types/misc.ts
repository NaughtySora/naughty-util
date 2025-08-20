import { Callback } from "./shared";

export interface UtilsMisc {
  id<T>(entity: T): T;
  inRange<T extends string | number>(value: T, min: T, max: T): boolean;
  compose<F extends Callback>(...fns: F[]): (...params: Parameters<F>) => any;
  range(end: number, start?: number, step?: number): Generator<number>;
  partial<F extends Callback>(fn: F, ...params: Partial<Parameters<F>>): (...params: any) => any;
  projection<T extends [string, string | T, Callback], O extends object>(meta: T[], data: O): any;
  enumerate(iterable: Iterable<any>): Generator<[any, number]>;
  random(max: number, min?: number): number;
  timestamp(): () => { nanoseconds: number, seconds: number },
  unique(): string;
}