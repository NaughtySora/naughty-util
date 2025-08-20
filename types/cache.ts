type Set = (key: any, value: any) => void;

interface Cache {
  limit(count: number): this;
  timeout(ms: number): this;
  get(key: any): any;
  ms: number;
  max: number;
  [Symbol.dispose](): void;
}

export type UtilsCache = ({ ms, max }?: { ms?: number, max?: number }) => Set & Cache;