
export interface UtilsStream {
  /**
   * Works with readable streams
   * @example
   * // read file stream
   * const file = fs.createReadStream(PATH_NAME);
   * const buffer = await stream.read(file);
   *
   * @example
   * // http request
   * const buffer = await stream.read(req);
   *
   */
  read<S extends NodeJS.ReadableStream>(readable: S): Promise<Buffer>;
  /**
   * Same as read method, but returns utf8 string
   * @example
   * // read file stream
   * const file = fs.createReadStream(PATH_NAME);
   * const string = await stream.utf8(file);
   */
  utf8<S extends NodeJS.ReadableStream>(readable: S): Promise<string>;
}
