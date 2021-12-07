import type { LogLevel, LogMethod, LogOptions } from './interface'

enum LogLevelPriority {
  'DETAIL' = 1,
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
  'INFO' = '\x1b[37m%s',
  'WARN' = '\x1b[33m%s',
  'ERROR' = '\x1b[31m%s',
  'SUCCESS' = '\x1b[32m%s'
};
const DEFAULT_LOGGER_LEVEL = 'INFO'
const DEFAULT_LOGGER_PREFIX = 'AIRMUS-LOGGER'
export default class Logger {
  private logLevel: LogLevel = DEFAULT_LOGGER_LEVEL;
  private logPrefix: string = DEFAULT_LOGGER_PREFIX;

  public constructor({
    logLevel,
    logPrefix
  }: LogOptions = {}) {
    this.logLevel = logLevel ?? DEFAULT_LOGGER_LEVEL
    this.logPrefix = logPrefix ?? DEFAULT_LOGGER_PREFIX
  }

  public logInfo(...msgs: any[]): void {
    if (LogLevelPriority[this.logLevel] <= LogLevelPriority['INFO']) {
      this.logOptimize('INFO', msgs)
    }
  }

  public logSuccess(...msgs: any[]): void {
    if (LogLevelPriority[this.logLevel] <= LogLevelPriority['SUCCESS']) {
      this.logOptimize('SUCCESS', msgs)
    }
  }

  public logWarn(...msgs: any[]): void {
    if (LogLevelPriority[this.logLevel] <= LogLevelPriority['WARN']) {
      this.logOptimize('WARN', msgs)
    }
  }

  public logErr(...msgs: any[]): void {
    if (LogLevelPriority[this.logLevel] <= LogLevelPriority['ERROR']) {
      this.logOptimize('ERROR', msgs)
    }
  }

  public setLevel = (level: LogLevel) => {
    this.logLevel = level
  }

  private logOptimize(method: LogMethod, msgs: any[]): void {
    const inBrowser = typeof window !== 'undefined';
    const logMsg = inBrowser ? [ColorPlates[method], `[${this.logPrefix}]:`, ...msgs] : [NodeColorPlates[method], `[${this.logPrefix}]:`, ...msgs]

    if (inBrowser) {
      if (method === 'ERROR') {
        console.error('%c%s', ...logMsg);
      } else if (method === 'WARN') {
        console.warn('%c%s', ...logMsg);
      } else {
        console.log('%c%s', ...logMsg);
      }
    } else {
      console.log(...logMsg);
    }
  }
}
