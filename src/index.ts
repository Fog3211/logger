import type { LogLevel, LogMethod, LoggerOption } from './index.d'

enum LogLevelPriority {
  'INFO' = 2,
  'SUCCESS' = 3,
  'WARN' = 3,
  'ERROR' = 4,
  'SILENT' = 5,
}
enum ColorPlates {
  'INFO' = 'color: #1f132b; background-color: #f0f0f0',
  'WARN' = 'color: #494008; background-color: #e7c60c',
  'ERROR' = 'color: white; background-color: #D33F49',
  'SUCCESS' = 'color: white; background-color: #95B46A'
};

enum NodeColorPlates {
  'INFO' = '\x1b[37m',
  'WARN' = '\x1b[30m',
  'ERROR' = '\x1b[31m',
  'SUCCESS' = '\x1b[32m'
};
const DEFAULT_LOGGER_LEVEL = 'INFO'
const DEFAULT_LOGGER_PREFIX = 'AIRMUS-LOGGER'

export default class Logger {
  private logLevel: LogLevel = DEFAULT_LOGGER_LEVEL;
  private logPrefix: string = DEFAULT_LOGGER_PREFIX;

  public constructor({
    logLevel,
    logPrefix
  }: LoggerOption = {}) {
    this.logLevel = logLevel ?? DEFAULT_LOGGER_LEVEL
    this.logPrefix = logPrefix ?? DEFAULT_LOGGER_PREFIX
  }

  public logInfo<T>(...msgs: T[]): void {
    if (LogLevelPriority[this.logLevel as LogLevel] <= LogLevelPriority['INFO']) {
      this.logOptimize('INFO', msgs)
    }
  }

  public logSuccess<T>(...msgs: T[]): void {
    if (LogLevelPriority[this.logLevel as LogLevel] <= LogLevelPriority['SUCCESS']) {
      this.logOptimize('SUCCESS', msgs)
    }
  }

  public logWarn<T>(...msgs: T[]): void {
    if (LogLevelPriority[this.logLevel as LogLevel] <= LogLevelPriority['WARN']) {
      this.logOptimize('WARN', msgs)
    }
  }

  public logErr<T>(...msgs: T[]): void {
    if (LogLevelPriority[this.logLevel as LogLevel] <= LogLevelPriority['ERROR']) {
      this.logOptimize('ERROR', msgs)
    }
  }

  private logOptimize<T>(method: LogMethod, ...msg: T[]): void {
    const inBrowser = typeof window !== 'undefined';
    const prefix = inBrowser ? [ColorPlates[method], this.logPrefix] : [NodeColorPlates[method], this.logPrefix]

    if (method === 'ERROR') {
      console.error(['%c%s', ...prefix, ...msg]);
    } else if (method === 'WARN') {
      console.warn(['%c%s', ...prefix, ...msg]);
    } else {
      console.log(['%c%s', ...prefix, ...msg]);
    }
  }
}