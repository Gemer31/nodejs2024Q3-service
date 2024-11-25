import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

const BITES_IN_KB = 1024;
const DEFAULT_LOG_FILE_SIZE_IN_BITES = 51200;

@Injectable()
export class LoggingService extends ConsoleLogger {
  private static logFilePath = path.join(__dirname, '../../logs/app.log');
  private static errLogFilePath = path.join(__dirname, '../../logs/error.log');
  private static maxFileSize: number;
  private static configLogLevel: number;
  private static currentLogSize = 0;
  private static currentErrorLogSize = 0;

  constructor(private configService: ConfigService) {
    super();

    const logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    if (LoggingService.maxFileSize === undefined) {
      LoggingService.maxFileSize =
        parseInt(configService.get('LOG_MAX_SIZE_KB'), 10) * BITES_IN_KB || DEFAULT_LOG_FILE_SIZE_IN_BITES;

      LoggingService.configLogLevel = this.getLogLevel(
        configService.get('LOG_LEVEL'),
      );

      LoggingService.currentLogSize = this.getFileSize(
        LoggingService.logFilePath,
      );

      LoggingService.currentErrorLogSize = this.getFileSize(
        LoggingService.errLogFilePath,
      );
    }
  }

  private getLogLevel(level: string): number {
    switch (level.toLowerCase()) {
      case 'error':
      case '0':
        return 0;
      case 'warn':
      case '1':
        return 1;
      case 'log':
      case '2':
        return 2;
      case 'debug':
      case '3':
        return 3;
      case 'verbose':
      case '4':
        return 4;
      default:
        return 2;
    }
  }

  public log(msg: any, ctx?: string): void {
    if (LoggingService.configLogLevel >= 2) {
      super.log(msg, ctx);
      this.writeToFile('LOG', msg, LoggingService.logFilePath);
    }
  }

  public error(msg: any, trace?: string, cts?: string): void {
    if (LoggingService.configLogLevel >= 0) {
      super.error(msg, trace, cts);
      this.writeToFile(
        'ERROR',
        msg + (trace ? ` - ${trace}` : ''),
        LoggingService.errLogFilePath,
      );
    }
  }

  public warn(msg: any, ctx?: string): void {
    if (LoggingService.configLogLevel >= 1) {
      super.warn(msg, ctx);
      this.writeToFile('WARN', msg, LoggingService.logFilePath);
    }
  }

  public debug(msg: any, ctx?: string): void {
    if (LoggingService.configLogLevel >= 3) {
      super.debug(msg, ctx);
      this.writeToFile('DEBUG', msg, LoggingService.logFilePath);
    }
  }

  public verbose(msg: any, ctx?: string): void {
    if (LoggingService.configLogLevel >= 4) {
      super.verbose(msg, ctx);
      this.writeToFile('VERBOSE', msg, LoggingService.logFilePath);
    }
  }

  private writeToFile(lvl: string, msg: string, filePath: string): void {
    this.rotateLogFileIfNeeded(filePath);
    fs.appendFileSync(filePath, `${new Date().toISOString()} [${lvl}] ${msg}\n`);
  }

  private getFileSize(filePath: string): number {
    try {
      return fs.statSync(filePath).size;
    } catch {
      return 0;
    }
  }

  private rotateLogFileIfNeeded(filePath: string): void {
    const fileSize = this.getFileSize(filePath);

    if (fileSize >= LoggingService.maxFileSize) {
      this.rotateFile(filePath);
    }
  }

  private rotateFile(filePath: string): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.renameSync(
      filePath,
      `${filePath}.${timestamp}`
    );
  }
}
