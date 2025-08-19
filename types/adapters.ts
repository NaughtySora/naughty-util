import { Callback, UtilsAsync, CallbackAsync } from "./async";

type Wrapper<F extends Callback> = (...args: Parameters<F>) => ReturnType<F>;
type AsyncWrapper<F extends Callback> = (...args: Parameters<F>) => Promise<ReturnType<F>>;
type ErrBack = (err: typeof Error | null, data: any) => void;

type GetFields<Target, Keys extends (keyof Target)[]> = Pick<Target, Keys[number]>;

interface LogableOptions {
  logger?: GetFields<Console, ["info", "error", "log"]>;
  suppress?: boolean;
}

interface CancellableOptions {
  signal: AbortSignal,
}

export interface UtilsAdapters {
  once<F extends Callback>(fn: F): Wrapper<F>,
  limit<F extends Callback>(fn: F, count: number,): Wrapper<F>,
  timeout<F extends Callback>(fn: F, ms: number,): Wrapper<F>,
  debounce<F extends Callback>(fn: F, ms: number,): Wrapper<F> & { [Symbol.dispose](): void },
  throttle<F extends Callback>(fn: F, ms: number, count: number,): Wrapper<F> & { [Symbol.dispose](): void },
  scoped<E extends object>(entity: E, onDispose: (entity: E) => any): E & { [Symbol.dispose](): ReturnType<typeof onDispose> },
  count<F extends Callback>(fn: F): Wrapper<F> & { counter: number },
  promisify: UtilsAsync["promisify"],
  asyncify<F extends Callback>(fn: F): AsyncWrapper<F>,
  callbackify<F extends CallbackAsync>(fn: F): (...args: Parameters<F> & { callback: ErrBack }) => void,
  logify: {
    async<F extends CallbackAsync>(fn: F, options?: LogableOptions): AsyncWrapper<F>,
    sync<F extends Callback>(fn: F, options?: LogableOptions): Wrapper<F>,
  },
  cancellable: {
    sync<F extends Callback>(fn: F): Wrapper<F>,
    async<F extends CallbackAsync>(fn: F, options: CancellableOptions): AsyncWrapper<F>,
  },
}