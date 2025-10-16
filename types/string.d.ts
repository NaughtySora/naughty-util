
type CapitalizeWord<S extends string> =
  S extends `${infer First}${infer Rest}` ?
  `${Uppercase<First>}${Lowercase<Rest>}` : S;

export interface UtilsString {
  capitalize<T extends string>(s: T): CapitalizeWord<T>;
  lower<T extends string>(s: T): Lowercase<T>;
  upper<T extends string>(s: T): Uppercase<T>;
  slug(s: string): string;
}
