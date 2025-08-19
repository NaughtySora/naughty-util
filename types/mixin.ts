export interface UtilsMixin {
  weakAssign<T extends object, M extends object>(target: T, mixin: M): M & T;
  forget<T extends object, K extends keyof T>(target: T, keys: K[]): any;
}