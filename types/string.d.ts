
type CapitalizeWord<S extends string> =
  S extends `${infer First}${infer Rest}` ?
  `${Uppercase<First>}${Lowercase<Rest>}` : S;

export interface UtilsString {
  /**
   *
   * @example
   * capitalize("hi!, hello"); // "Hi!, hello"
   */
  capitalize<T extends string>(s: T): CapitalizeWord<T>;
  /**
   *
   * @example
   * lower("HI!, hello"); // "hi!, hello"
   */
  lower<T extends string>(s: T): Lowercase<T>;
  /**
   *
   * @example
   * upper("hi!, hello"); // "HI!, HELLO"
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
   * Default length: 1.\
   * Check condition: data.length >= length.
   * @example
   * valid("abc");    // true
   * valid("");       // false
   * valid("abc", 5); // false
   */
  valid(data: any, length?: number): data is string;
}
