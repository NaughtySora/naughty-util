
// Submodule: abstract

interface UtilsAbstract {
  factorify<T, N, K extends keyof T>(dataset: T, nullable: N): (key: K) => T[K] | N;
  factory<T extends { new(): any }>(Interface: T, ...params: ConstructorParameters<T>): () => InstanceType<T>;
}

export const abstract: UtilsAbstract;

// Submodule: array

interface UtilsArray {
  valid(data: any): boolean;
  accessor<T>(array: Array<T>, meta: Record<string | symbol, number>): Array<T>;
}

export const array: UtilsArray;

// Submodule: async
interface Thenable<T> {
  then(resolve: typeof Promise.resolve<T>, reject: typeof Promise.reject): void;
}

interface UtilsAsync {
  promisify<T extends (...args: any) => any>(fn: T): (...params: Parameters<T>) => any;
  compose<T extends (...args: any) => Promise<any>>(...fns: T[]): (...args: any[]) => Promise<any>;
  thenable(fn: (...args: [...any, (err: any, data: any) => any]) => any, ...params: any[]): Thenable<any>;
  pause(ms: number): Promise<void>;
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
  weakAssign<T extends object, M extends object>(target: T, mixin: M): M & T;
  forget<T extends object, K extends keyof T>(target: T, keys: K[]): any;
}

export const mixin: UtilsMixin;

// Submodule: date

interface UtilsDate {
  verbalEpoch(input: string): number;
  verbal(input: string): number;
  unix(input: ConstructorParameters<DateConstructor>[0]): number;
  midnightUTC(input: ConstructorParameters<DateConstructor>[0]): number;
  midnight(input: ConstructorParameters<DateConstructor>[0]): number;
  difference(base: ConstructorParameters<DateConstructor>[0], target: ConstructorParameters<DateConstructor>[0]): number;
  reached(base: ConstructorParameters<DateConstructor>[0], target: ConstructorParameters<DateConstructor>[0]): boolean;
  DAY: number;
  HOUR: number;
  MINUTE: number;
  SECOND: number;
}

export const date: UtilsDate;

// Submodule: http

interface UtilsHTTP {
  parseHost(host: string): string;
  parseCookies(cookie: string): Record<string, string>;
  createParams(params: string[][] | Record<string, string> | string | URLSearchParams): string;
  parseParams(params: string[][] | Record<string, string> | string | URLSearchParams): Record<string, string>;
  parseURL(pathname: string): URL;
}

export const http: UtilsHTTP;

// Submodule: misc

interface UtilsMisc {
  id<T>(entity: T): T;
  inRange<T>(value: T, min: T, max: T): boolean;
  compose<T extends (...args: any) => any>(...fns: T[]): (...args: any[]) => any;
  range(end: number, start?: number, step?: number): Generator<number>;
  partial<T extends (...args: any) => any>(fn: T, ...params: any[]): (...args: any[]) => any;
  projection<T extends [string, string | T, (...args: any) => any], O extends object>(meta: T[], data: O): any;
}

export const misc: UtilsMisc;