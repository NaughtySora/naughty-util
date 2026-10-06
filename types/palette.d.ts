export interface UtilsPalette {
  COLORS: Readonly<{
    gray: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    purple: string;
    cyan: string;
    white: string;
  }>;
  CLEAN: string;
  /**
   * Dye text to display in terminal emulator \
   * that supports ANSI escape sequences.
   * @example
   * dye(COLORS.blue, "text"); // will display text as blue
   * // "\x1b[1;34mtext\x1b[0m"
   */
  dye(color: string, text: string): string;
}
