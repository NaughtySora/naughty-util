interface Box<T> {
  unwrap(): T;
  valueOf(): string;
}

abstract class Option<T> implements Box<T> {
  abstract unwrap(): T;
  abstract valueOf(): string;
  abstract from<V>(value: V): Option<V>;
}

abstract class Result<T> implements Box<T> {
  abstract unwrap(): T;
  abstract valueOf(): string;
  abstract from<V>(value: V): Result<V>;
}

export interface UtilsAbstract {
  factorify<T, N, K extends keyof T>(dataset: T, nullable?: N): (key: K) => T[K] | N;
  factory<T extends { new(): any }>(Interface: T, ...params: ConstructorParameters<T>): () => InstanceType<T>;
  Option: new <T>(arg: T) => Option<T>;
  Result: new <T>(arg: T) => Result<T>;
  match: <T extends Box<any>, F extends Function> (entity: T, strategies: Record<string, F>) => any,
}