export interface UtilsReflection {
  isClass(entity: any): boolean;
  isEmpty(entity: any): boolean;
  isPrimitive(entity: any): boolean;
  isComplex(entity: any): boolean;
  isFalsy(entity: any): boolean;
  isError(entity: any): boolean;
  isAsyncFunction(entity: any): boolean;
  isObject(entity: any): boolean;
}