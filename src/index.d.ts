
export type Any_Obj = {
  [propsName: string]: any
}

export type LogLevel =
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

  logErr: (msgs: IArguments) => void
  logInfo: (msgs: IArguments) => void
  logSuccess: (msgs: IArguments) => void
  logWarn: (msgs: IArguments) => void
}
