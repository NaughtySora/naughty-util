import { Thenable } from "./async";

export interface UtilsBuffer {
  /**
   * Shortcut for node:crypto randomFill
   */
  random(length?: number): Thenable<Buffer>;
}
