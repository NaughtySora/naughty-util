# Naughty Util
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/NaughtyySora/naughty-util/blob/master/LICENSE)
[![snyk](https://snyk.io/test/github/NaughtyySora/naughty-util/badge.svg)](https://snyk.io/test/github/NaughtyySora/naughty-util)
[![npm version](https://badge.fury.io/js/naughty-util.svg)](https://badge.fury.io/js/naughty-util)
[![NPM Downloads](https://img.shields.io/npm/dm/naughty-util)](https://www.npmjs.com/package/naughty-util)
[![NPM Downloads](https://img.shields.io/npm/dt/naughty-util)](https://www.npmjs.com/package/naughty-util)

## Usage
- Install: `npm install naughty-util`
- Require: `const utils = require('naughty-util')`

## Abstract utils

- `factorify<T, N, K extends keyof T>(dataset: T, nullable?: N): (key: K) => T[K] | N`
- `factory<T extends { new(): any }>(Interface: T, ...params: ConstructorParameters<T>): () => InstanceType<T>`

factorify helps remove tons of ifs and switches, also helps with strategies and commands.

```js
const example = abstract.factorify({
  order: (user, id, message = "") => ({name: user.name, id, cancelled: false, message}),
  cancel: (user, id, message = "") => ({name: user.name, id, cancelled: true, message}),
  payments: (user, id, message = "") => ({name: user.name,}),
}, {user: null, id: 0});

const result = example("cancel");
console.log(result); // ({name: user.name, id, cancelled: true, message})
const nullable = example("randomText");
console.log(nullable); // {user: null, id: 0}
```

## Array utils

- `valid(data: any): boolean`
- `accessor<T>(array: Array<T>, meta: Record<string | symbol, number>): Array<T>`

Access helps rid of unnamed values of the array

```js
const user = ["John Doe", 18, true];
const meta = {name: 0, age: 1, employed: 2};
array.accessor(user, meta);
console.log(user.name, user.age, user.employed); // John Doe", 18, true
```

## Async utils

- `promisify<F extends Callback>(fn: F): (...params: Parameters<F>) => any`
- `compose<F extends CallbackAsync>(...fns: F[]): (...params: Parameters<F>) => Promise<any>`
- `thenable<F extends Callback>(fn: F, ...params: Parameters<F>): Thenable<any>`
- `pause(ms: number): Promise<void>`

promisify allow to change callback last error first(errback) to Promise contract.

```js
  const fsPromise = async.promisify(fs.readFile);
  const file = await fsPromise(__filename, "utf-8");
  console.log(file);
```

## Buffer utils

- `random(length?: number): Thenable<Buffer>`

## Stream utils

- `read<T extends NodeJS.ReadableStream>(readable: T): Thenable<Buffer>`

read helps with reading stream/readable, http socket for example

```js
  const handler = async(req, res) => {
    const body = await stream.read(req);
    console.log(body);
  };
```

## number utils

- `safe(value: number): number`
- `isSafe(value: number): boolean`
- `positiveInt(value: number): boolean`
- `cutFraction(value: number): number`
- `total(dataset: number[]): number`
- `average(dataset: number[]): number`

## mixin utils

- `weakAssign<T extends object, M extends object>(target: T, mixin: M): M & T`
- `forget<T extends object, K extends keyof T>(target: T, keys: K[]): any`

## date utils

- `verbalEpoch(input: string): number`
- `verbal(input: string): number`
- `unix(input: ConstructorParameters<DateConstructor>[0]): number`
- `midnightUTC(input: ConstructorParameters<DateConstructor>[0]): number`
- `midnight(input: ConstructorParameters<DateConstructor>[0]): number`
- `difference(base: ConstructorParameters<DateConstructor>[0], target: ConstructorParameters<DateConstructor>[0]): number`
- `reached(base: ConstructorParameters<DateConstructor>[0], target: ConstructorParameters<DateConstructor>[0]): boolean`
- `DAY: number`
- `HOUR: number`
- `MINUTE: number`
- `SECOND: number`

## HTTP utils

- `parseHost(host: string): string`
- `parseCookies(cookie: string): Record<string, string>`
- `createParams(params: string[][] | Record<string, string> | string | URLSearchParams): string`
- `parseParams(params: string[][] | Record<string, string> | string | URLSearchParams): Record<string, string>`
- `parseURL(pathname: string): URL`

## Misc utils

- `id<T>(entity: T): T`
- `inRange<T extends string | number>(value: T, min: T, max: T): boolean`
- `compose<F extends Callback>(...fns: F[]): (...params: Parameters<F>) => any`
- `range(end: number, start?: number, step?: number): Generator<number>`
- `partial<F extends Callback>(fn: F, ...params: Partial<Parameters<F>>): (...params: any) => any`
- `projection<T extends [string, string | T, Callback], O extends object>(meta: T[], data: O): any`

## Part of the naughty stack