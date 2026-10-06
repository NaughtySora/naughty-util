
interface DomainErrorOptions<Code, Details> {
  code?: Code;
  cause?: any;
  details?: Details;
}

interface ToJSON<C, D, M> {
  code: C;
  message: M;
  details: D;
  time: string;
  stack: string;
}

declare class DomainError<M extends string = "", C = 400, D = null> extends Error {
  constructor(message?: M, options?: DomainErrorOptions<C, D>);
  toJSON(): ToJSON<C, D, M>;
  toString(): string;
  valueOf(): string;
  log(): string;
  time: string;
  details: D;
  code: C;
  message: M;
  toError(): InstanceType<typeof Error>;
  adopt<F extends Function>(...entities: F[]): this;
}

interface DescriptiveErrorOptions {
  code?: any;
  cause?: any;
}

declare class DescriptiveError extends Error {
  constructor(message?: string, options?: DescriptiveErrorOptions);
}

declare class ImplementationError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>);
  static ctor<C extends { name: string }>(Class: C): ImplementationError;
  static method<C extends { name: string }>(Class: C, method: string): ImplementationError;
}

export interface UtilsError {
  /**
   * Generic domain error.
   * @example
   * try {
   *  // do logic
   *  // if need custom message | code
   *  if(something) throw new DescriptiveError("Message");
   * } catch(e) {
   *  throw new DomainError(
   *    "Error while doing things",
   *    {
   *      cause: e,
   *      details: { user, query },
   *      code: 80085,
   *    }
   *  ).adopt(DescriptiveError);
   * // will use information from DescriptiveError
   * }
   */
  DomainError: typeof DomainError;
  /**
   * Used with conjunction with DomainError
   */
  DescriptiveError: typeof DescriptiveError;
  /**
   * For designing and prototyping
   * @example
   * class Abstract {
   *  constructor(){
   *    if(new.target === Abstract){
   *      throw ImplementationError.ctor(Abstract);
   *    }
   *  }
   *  connect(){
   *    throw ImplementationError.method(Abstract, "connect");
   *  }
   * }
   */
  ImplementationError: typeof ImplementationError;
  /**
   * if error has no toJSON method will\
   * recursively return message, stack, and cause.\
   * Otherwise call error.toJSON();
   */
  toJSON<E extends Error>(error: E): any;
  /**
   * @example
   *  throwNullable(undefined); // throws
   *  throwNullable(null); // throws
   *  throwNullable({}, new Error("Custom error")); // doesn't
   */
  throwNullable<T>(entity: T, e?: Error): asserts entity is NonNullable<T>;
}
