import { UtilsMisc } from "./misc";

type ExcludeSymbol<Keys> = Exclude<Keys, symbol>;

export interface UtilsIterator extends Pick<UtilsMisc, "enumerate" | "range"> {
  pick<T extends object, K extends keyof T>(sequence: Iterable<T>, name: K): Generator<T[K]>;
  limit<T>(sequence: Iterable<T>, limit: number): Generator<T>;
  object: {
    keys<O extends object>(obj: O): Generator<ExcludeSymbol<keyof O>>;
    values<O extends object>(obj: O): Generator<O[ExcludeSymbol<keyof O>]>;
    entries<O extends object, Keys extends ExcludeSymbol<keyof O>>(obj: O): Generator<[Keys, O[Keys]]>;
  }
}

