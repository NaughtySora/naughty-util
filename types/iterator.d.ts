import { UtilsMisc } from "./misc";

export interface UtilsIterator extends Pick<UtilsMisc, "enumerate" | "range"> {
  pick<T extends object, K extends keyof T>(sequence: Iterable<T>, name: K): Generator<T[K]>;
  limit<T>(sequence: Iterable<T>, limit: number): Generator<T>;
}
