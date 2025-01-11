
// Submodule: abstract

interface UtilsAbstract {
  factorify<T, N, K extends keyof T>(dataset: T, nullable: N): (key: K) => T[K] | N;
  factory<T extends { new(): any }>(Interface: T, ...params: ConstructorParameters<T>): () => InstanceType<T>;
}

export const abstract: UtilsAbstract;

// Submodule: array

interface UtilsArray {
  valid(data: any): boolean;
}

export const array: UtilsArray;

// Submodule: async
interface Thenable<T> {
  then(resolve: typeof Promise.resolve<T>, reject: typeof Promise.reject): void;
}
interface UtilsAsync {
  promisify<T extends (...args: any) => any>(fn: T): (...params: Parameters<T>) => any;
  compose<T extends (...args: any) => any>(...fns: T[]): (...args: any[]) => Promise<any>;
  thenable(fn: (...args: [...any, (err: any, data: any) => any]) => any, ...params: any[]): Thenable<any>;
}

export const async: UtilsAsync;

// Submodule: buffer

interface UtilsBuffer {
  random(length?: number): Thenable<Buffer>;
}

export const buffer: UtilsBuffer;

// Submodule: stream
interface UtilsStream {
  read<T extends ReadableStream>(readable: T): Thenable<Buffer>;
}

export const stream: UtilsStream;

// Submodule: number
interface UtilsNumber {
  safe(value: number): number;
  isSafe(value: number): boolean;
  positiveInt(value: number): boolean;
  cutFraction(value: number): number;
  total(dataset: number[]): number;
  average(dataset: number[]): number;
}

export const number: UtilsNumber;


// Submodule: mixin

interface UtilsMixin {
  weakAssign<T extends object, M extends object>(target: T, minix: M): M & T;
  forget<T extends object, K extends keyof T>(target: T, keys: K[]): any;
}

export const mixin: UtilsMixin;
