
export interface UtilsStream {
  read<S extends NodeJS.ReadableStream>(readable: S): Promise<Buffer>;
  utf8<S extends NodeJS.ReadableStream>(readable: S): Promise<string>;
}