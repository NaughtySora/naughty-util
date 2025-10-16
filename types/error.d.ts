
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
}

export interface UtilsError {
  DomainError: typeof DomainError;
}
