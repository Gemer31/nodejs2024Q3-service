import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from '../services/logging.service';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private loggingService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const msg =
      exception instanceof HttpException ? exception.getResponse() : exception;
    const errorMsg = `${request.method} ${
      request.url
    } - ${status} - ${JSON.stringify(msg)}`;
    const errorStack = exception instanceof Error ? exception.stack : '';

    this.loggingService.error(errorMsg, errorStack, 'HttpExceptionsFilter');

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: msg,
    });
  }
}
