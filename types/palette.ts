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
  dye(color: string, text: string): string;
}