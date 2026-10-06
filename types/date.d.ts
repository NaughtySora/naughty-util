export interface UtilsDate {
  /**
   * Transforms verbal notation into timestamp and adds current timestamp
   * @example
   * verbalEpoch('2d 10s 20s 5m'); // Date.now() + 173130000
   */
  verbalEpoch(input: string): number;
  /**
   * Transforms verbal notation into timestamp
   * @example
   * verbal('2d 10s 20s 5m'); // 173130000
   */
  verbal(input: string): number;
  /**
   * Transforms input into date, divides by 1000 and rounds
   */
  unix(input: ConstructorParameters<DateConstructor>[0]): number;
  /**
   *  sets 00:00:00 using UTC
   */
  midnightUTC(input: ConstructorParameters<DateConstructor>[0]): number;
  /**
   * sets 00:00:00 using local time
   */
  midnight(input: ConstructorParameters<DateConstructor>[0]): number;
  /**
   * Checks difference between target and base\
   * target - base
   * @example
   * difference(Date.now(), Date.now() + 5000); ~ 5000
   * difference(Date.now(), Date.now() - 5000); ~ -5000
   */
  difference(base: ConstructorParameters<DateConstructor>[0], target: ConstructorParameters<DateConstructor>[0]): number;
  /**
   * Checks if the target reached the base\
   * target >= base
   * @example
   * reached(Date.now(), Date.now() + 5000); // true
   * reached(Date.now(), Date.now() - 5000); // false
   */
  reached(base: ConstructorParameters<DateConstructor>[0], target: ConstructorParameters<DateConstructor>[0]): boolean;
  /**
   * Checks if input can be parsed as date
   * @example
   * valid(new Date()); // true
   * valid(12345678); // true
   * valid("abc"); // false
   */
  valid(date: string | Date): date is string | Date;
  /**
   * 86400000
   */
  DAY: number;
  /**
   * 3600000
   */
  HOUR: number;
  /**
   * 60000
   */
  MINUTE: number;
  /**
   * 1000
   */
  SECOND: number;
}
