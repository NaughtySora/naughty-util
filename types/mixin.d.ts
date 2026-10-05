type ExcludeKeys<T, K extends (keyof T)[]> = {
  [P in keyof T as P extends K[number] ? never : P]: T[P];
};

export interface UtilsMixin {
  /**
   * merges fields, skips fields that already in target and value different from undefined
   */
  weakAssign<T extends object, M extends object>(target: T, mixin: M): M & T;
  /**
   * @deprecated
   * delete fields in the object\
   * will be deleted in 1.0
   */
  forget<T extends object, K extends (keyof T)[]>(target: T, keys: K): ExcludeKeys<T, K>;
}
