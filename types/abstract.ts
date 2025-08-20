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
  factorify<T, N, K extends keyof T>(dataset: T, nullable?: N): (key: K) => T[K] | N;
  factory<T extends { new(): any }>(Interface: T, ...params: ConstructorParameters<T>): () => InstanceType<T>;
  Option: typeof Option;
  Result: typeof Result;
  match: <T extends Box<any>, F extends Function> (entity: T, strategies: Record<string, F>) => any,
}
