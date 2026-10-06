export interface UtilsNumber {
  /**
   * returns finite value or 0
   */
  safe(value: number): number;
  /**
   * checks if value is finite, save to use as number\
   * has nothing to do with overflow or precision loss
   */
  isSafe(value: number): boolean;
  /**
   * Is value positive integer
  */
  positiveInt(value: number): boolean;
  /**
   * Round up value to 2 decimals
   */
  cutFraction(value: number): number;
  /**
   * sum up array of numbers
   */
  total(dataset: number[]): number;
  /**
   * sum up array of numbers and divides but its length
   */
  average(dataset: number[]): number;
  /**
   * how much percent does part occupies in amount
   * @example
   * percentRatio(500, 25); // 5
   */
  percentRatio(amount: number, part: number): number;
  /**
   * how much value is percent of the base
   * @example
   * percentOf(500, 25); // 125
   */
  percentOf(base: number, percent: number): number;
}
