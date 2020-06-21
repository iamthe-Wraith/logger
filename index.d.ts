type IColor = 'black'|'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white'|'gray'|'grey'|'rainbow'|'zebra'|'america'|'trap'|'random';
type IStyles = 'title'|'gen'|'success'|'warn'|'error'|'debug'|'complete';

interface mappedColors {
  title: IColor;
  gen: IColor;
  success: IColor;
  warn: IColor;
  error: IColor;
  debug: IColor;
  complete: IColor;
}

export const validColors: Set<IColor>;
export const validstyles: Set<IStyles>;
export const defaultColors: mappedColors;

declare class Logger {
  static colors: mappedColors;
  static init(args?: { colors?: Partial<mappedColors>, logPath?: string }): void;
  static _logWithStyle(style: IStyles, level: string|null, ...args: any[]): void;
  static title(...args: any[]): void
  static gen(...args: any[]): void;
  static success(...args: any[]): void;
  static warn(...args: any[]): void;
  static error(...args: any[]): void;
  static debug(...args: any[]): void;
  static complete(...args: any[]): void;
}
