
export interface UtilsStream {
  read<S extends NodeJS.ReadableStream>(readable: S): Promise<Buffer>;
  blob<S extends NodeJS.ReadableStream>(readable: S): Promise<Blob>;
  utf8<S extends NodeJS.ReadableStream>(readable: S): Promise<string>;
}