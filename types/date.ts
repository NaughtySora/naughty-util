export interface UtilsDate {
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