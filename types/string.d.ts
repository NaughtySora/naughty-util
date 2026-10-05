
type CapitalizeWord<S extends string> =
  S extends `${infer First}${infer Rest}` ?
  `${Uppercase<First>}${Lowercase<Rest>}` : S;

export interface UtilsString {
  /**
   *
   * @example
   * const str = "hi!, hello";
   * console.log(capitalize(str)); // "Hi!, hello"
   */
  capitalize<T extends string>(s: T): CapitalizeWord<T>;
  /**
   *
   * @example
   * const str = "HI!, hello";
   * console.log(lower(str)); // "hi!, hello"
   */
  lower<T extends string>(s: T): Lowercase<T>;
  /**
   *
   * @example
   * const str = "hi!, hello";
   * console.log(upper(str)); // "HI!, HELLO"
   */
  upper<T extends string>(s: T): Uppercase<T>;
  /**
   *
   * @example
   * slug("he-llo wor@ld");  // "he-llo-world";
   * slug("hello wor@ld");   // "hello-world";
   * slug("hello-world");    // "hello-world";
   * slug("h e l l 0!@#$%"); // "h-e-l-l-0";
   */
  slug(s: string): string;
  /**
   * default length: 1;\
   * check condition: data.length >= length;
   * @example
   * valid("abc")    // true
   * valid("")       // false
   * valid("abc", 5) // false
   */
  valid(data: any, length?: number): data is string;
}
