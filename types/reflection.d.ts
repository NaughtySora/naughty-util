import { UtilsArray } from "./array";

type NonNullablePrimitive = string | number | boolean |
  bigint | symbol | undefined;
type Falsy = false | 0 | -0 | 0n | "" | null | undefined | typeof NaN;
interface ArrayLike {
  length: number;
  [n: number]: never;
}

export interface UtilsReflection {
  isClass<C extends new (...args: any[]) => any>(entity: any): entity is C;
  isEmpty<E extends (null | undefined)>(entity: any): entity is E;
  isPrimitive(entity: any): entity is NonNullablePrimitive;
  isComplex(entity: any): entity is (object | Function);
  isFalsy<T extends any>(entity: T): entity is Exclude<T, Falsy>;
  isError(entity: any): entity is InstanceType<typeof Error>;
  isAsyncFunction<A extends (...args: any[]) => Promise<any>>(entity: any): entity is A;
  isObject(entity: any): entity is ((object & ArrayLike) | Function);
  isArray: UtilsArray["valid"];
}

