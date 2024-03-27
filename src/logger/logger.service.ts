import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
@Injectable()
export class MyLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('\x1b[1m\x1b[32m' + 'log', message, '\x1b[0m', optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(
      '\x1b[1m\x1b[31m' + 'error',
      message,
      optionalParams,
      '\x1b[0m',
    );
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      '\x1b[1m\x1b[33m' + 'warn',
      message,
      optionalParams,
      '\x1b[0m',
    );
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.debug(
      '\x1b[1m\x1b[35m' + 'debug',
      message,
      optionalParams,
      '\x1b[0m',
    );
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(
      '\x1b[1m\x1b[32m' + 'verbose',
      message,
      optionalParams,
      '\x1b[0m',
    );
  }
  setLogLevels?(levels: LogLevel[]) {
    console.log('\x1b[1m\x1b[32m' + 'levels', levels);
  }
}
