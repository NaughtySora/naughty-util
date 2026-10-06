import { PassThrough } from "node:stream";

export interface UtilsStream {
  /**
   * Works with readable streams
   * @example
   * // read file stream
   * await stream.read(filestream); // buffer
   * @example
   * // http request
   * await stream.read(req); // buffer
   */
  read<S extends NodeJS.ReadableStream>(readable: S): Promise<Buffer>;
  /**
   * Same as read method, but returns utf8 string
   * @example
   * // read file stream
   * await stream.utf8(filestream); // string
   */
  utf8<S extends NodeJS.ReadableStream>(readable: S): Promise<string>;
  /**
   * Makes 2 streams from 1 readable stream
   * @example
   * const [a, b] = tee(readable);
   * await stream.utf8(a); // copy of readable
   * await stream.utf8(b); // copy of readable
   */
  tee<S extends NodeJS.ReadableStream>(readable: S): [PassThrough, PassThrough];
}
