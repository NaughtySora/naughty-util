type Set = (key: any, value: any) => void;

interface Cache {
  limit(count: number): this;
  timeout(ms: number): this;
  get(key: any): any;
  ms: number;
  max: number;
  [Symbol.dispose](): void;
}
/**
 * @deprecated
 * Will be removed in 1.0.
 */
export type UtilsCache = ({ ms, max }?: { ms?: number, max?: number }) => Set & Cache;
