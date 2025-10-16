type ExcludeKeys<T, K extends (keyof T)[]> = {
  [P in keyof T as P extends K[number] ? never : P]: T[P];
};

export interface UtilsMixin {
  weakAssign<T extends object, M extends object>(target: T, mixin: M): M & T;
  forget<T extends object, K extends (keyof T)[]>(target: T, keys: K): ExcludeKeys<T, K>;
}
