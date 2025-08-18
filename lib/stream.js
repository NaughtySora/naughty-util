"use strict";

const read = async (readable) => {
  const result = [];
  for await (const chuck of readable) result.push(chuck);
  return Buffer.concat(result);
};

const blob = async stream => new Blob(await read(stream));

module.exports = {
  read,
  blob, // blob
};

// option, result, match

// once, ....

// const time_ratio = 1000000n;

// const measure = () => {
//   const start = process.hrtime.bigint();
//   return () => {
//     const end = process.hrtime.bigint();
//     return parseInt((end - start) / time_ratio);
//   };
// };

// const hash = () => Math.random().toString(32).substring(2);

//!
// class DomainError extends Error {
//   #message;
//   code = 400;
//   details = null;
//   time = new Date().toISOString();
//   constructor(
//     message: string,
//     { code = 400, cause, details = null }: DomainErrorOptions = {},
//   ) {
//     super(message, { cause });
//     this.name = DomainError.name;
//     this.#message = message;
//     this.message = code ? `[${code}]: ${message}` : message;
//     this.code = code ?? this.code;
//     this.details = details;
//   }

//   toJSON() {
//     const { code, cause, details, time } = this;
//     const message = this.#message;
//     return { code, message, cause, details, time };
//   }

//   toString() {
//     return this.message;
//   }
// }

// export default DomainError;
