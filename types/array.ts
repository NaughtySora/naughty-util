export interface UtilsArray {
  valid(data: any): boolean;
  accessor<T>(array: Array<T>, meta: Record<string | symbol, number>): Array<T>;
  shuffle<T>(array: Array<T>): Array<T>;
  avg<T>(array: Array<T>): number;
  max<T>(array: Array<T>): number;
  min<T>(array: Array<T>): number;
  sum<T>(array: Array<T>): number;
}
