
export type Any_Obj = Record<string, any>

export type LogLevel =
  | 'DETAIL'
  | 'INFO'
  | 'WARN'
  | 'ERROR'
  | 'SILENT';

export type LogMethod =
  | 'INFO'
  | 'WARN'
  | 'SUCCESS'
  | 'ERROR';

export interface LogOptions {
  logLevel?: LogLevel;
  logPrefix?: string;
}
export declare class Logger {
  private logLevel;
  private logPrefix;
  private _logOptimize;

  constructor(options?: LogOptions)

  logErr: (...msgs: any[]) => void
  logInfo: (...msgs: any[]) => void
  logSuccess: (...msgs: any[]) => void
  logWarn: (...msgs: any[]) => void
  setLevel: (level: LogLevel) => void
}
