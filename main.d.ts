type Callback = (...args: any[]) => any;
type CallbackAsync = (...args: any) => Promise<any>;
interface Thenable<T> {
  then(resolve: (data: T) => any, reject?: (err: any) => any): void;
}

interface UtilsAbstract {
  factorify<T, N, K extends keyof T>(dataset: T, nullable?: N): (key: K) => T[K] | N;
  factory<T extends { new(): any }>(Interface: T, ...params: ConstructorParameters<T>): () => InstanceType<T>;
}

interface UtilsArray {
  valid(data: any): boolean;
  accessor<T>(array: Array<T>, meta: Record<string | symbol, number>): Array<T>;
  shuffle<T>(array: Array<T>): Array<T>;
  avg<T>(array: Array<T>): number;
  max<T>(array: Array<T>): number;
  min<T>(array: Array<T>): number;
  sum<T>(array: Array<T>): number;
}

interface UtilsAsync {
  promisify<F extends Callback>(fn: F): (...params: Parameters<F>) => any;
  compose<F extends CallbackAsync>(...fns: F[]): (...params: Parameters<F>) => Promise<any>;
  thenable<F extends Callback>(fn: F, ...params: Parameters<F>): Thenable<any>;
  pause(ms: number): Promise<void>;
  parallel<F extends CallbackAsync>(...fns: F[]): (...params: Parameters<F>) => Promise<any>;
}

interface UtilsBuffer {
  random(length?: number): Thenable<Buffer>;
}

interface UtilsStream {
  read<S extends NodeJS.ReadableStream>(readable: S): Promise<Buffer>;
  blob<S extends NodeJS.ReadableStream>(readable: S): Promise<Blob>;
  utf8<S extends NodeJS.ReadableStream>(readable: S): Promise<string>;
}

interface UtilsNumber {
  safe(value: number): number;
  isSafe(value: number): boolean;
  positiveInt(value: number): boolean;
  cutFraction(value: number): number;
  total(dataset: number[]): number;
  average(dataset: number[]): number;
  percentRatio(amount: number, part: number): number;
  percentOf(base: number, percent: number): number;
}

interface UtilsMixin {
  weakAssign<T extends object, M extends object>(target: T, mixin: M): M & T;
  forget<T extends object, K extends keyof T>(target: T, keys: K[]): any;
}

interface UtilsDate {
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

interface UtilsHTTP {
  parseHost(host: string): string;
  parseCookies(cookie: string): Record<string, string>;
  createParams(params: string[][] | Record<string, string> | string | URLSearchParams): string;
  parseParams(params: string[][] | Record<string, string> | string | URLSearchParams): Record<string, string>;
  parseURL(pathname: string): URL;
  CODES: {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a Teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    509: 'Bandwidth Limit Exceeded',
    510: 'Not Extended',
    511: 'Network Authentication Required',
    continue: 100,
    switchingProtocols: 101,
    processing: 102,
    earlyHints: 103,
    ok: 200,
    created: 201,
    accepted: 202,
    nonauthoritativeInformation: 203,
    noContent: 204,
    resetContent: 205,
    partialContent: 206,
    multistatus: 207,
    alreadyReported: 208,
    imUsed: 226,
    multipleChoices: 300,
    movedPermanently: 301,
    found: 302,
    seeOther: 303,
    notModified: 304,
    useProxy: 305,
    temporaryRedirect: 307,
    permanentRedirect: 308,
    badRequest: 400,
    unauthorized: 401,
    paymentRequired: 402,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    notAcceptable: 406,
    proxyAuthenticationRequired: 407,
    requestTimeout: 408,
    conflict: 409,
    gone: 410,
    lengthRequired: 411,
    preconditionFailed: 412,
    payloadTooLarge: 413,
    uriTooLong: 414,
    unsupportedMediaType: 415,
    rangeNotSatisfiable: 416,
    expectationFailed: 417,
    imaTeapot: 418,
    misdirectedRequest: 421,
    unprocessableEntity: 422,
    locked: 423,
    failedDependency: 424,
    tooEarly: 425,
    upgradeRequired: 426,
    preconditionRequired: 428,
    tooManyRequests: 429,
    requestHeaderFieldsTooLarge: 431,
    unavailableForLegalReasons: 451,
    internalServerError: 500,
    notImplemented: 501,
    badGateway: 502,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
    httpVersionNotSupported: 505,
    variantAlsoNegotiates: 506,
    insufficientStorage: 507,
    loopDetected: 508,
    bandwidthLimitExceeded: 509,
    notExtended: 510,
    networkAuthenticationRequired: 511
  };
}

interface UtilsMisc {
  id<T>(entity: T): T;
  inRange<T extends string | number>(value: T, min: T, max: T): boolean;
  compose<F extends Callback>(...fns: F[]): (...params: Parameters<F>) => any;
  range(end: number, start?: number, step?: number): Generator<number>;
  partial<F extends Callback>(fn: F, ...params: Partial<Parameters<F>>): (...params: any) => any;
  projection<T extends [string, string | T, Callback], O extends object>(meta: T[], data: O): any;
  enumerate<T>(iterable: IterableIterator<any>): [T, number];
}

type Set = (key: any, value: any) => void;
interface Cache {
  limit(count: number): this;
  timeout(ms: number): this;
  get(key: any): any;
}

type UtilsCache = ({ ms, max }?: { ms?: number, max?: number }) => Set & Cache;

export const abstract: UtilsAbstract;
export const array: UtilsArray;
export const async: UtilsAsync;
export const buffer: UtilsBuffer;
export const stream: UtilsStream;
export const number: UtilsNumber;
export const mixin: UtilsMixin;
export const date: UtilsDate;
export const http: UtilsHTTP;
export const misc: UtilsMisc;
export const cache: UtilsCache;