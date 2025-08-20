import { Thenable } from "./async";

export interface UtilsBuffer {
  random(length?: number): Thenable<Buffer>;
}