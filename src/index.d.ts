
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

export interface LoggerOption {
  logLevel?: LogLevel;
  logPrefix?: string;
}

declare module 'easy-tracer' {

}
