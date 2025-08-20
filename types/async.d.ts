import { Callback, CallbackAsync } from "./shared";

export interface Thenable<T> {
  then(resolve: (data: T) => any, reject?: (err: any) => any): void;
}

export interface UtilsAsync {
  promisify<F extends Callback>(fn: F): (...params: Parameters<F>) => any;
  compose<F extends CallbackAsync>(...fns: F[]): (...params: Parameters<F>) => Promise<any>;
  thenable<F extends Callback>(fn: F, ...params: Parameters<F>): Thenable<any>;
  pause(ms: number): Promise<void>;
  parallel<F extends CallbackAsync>(...fns: F[]): (...params: Parameters<F>) => Promise<any>;
}