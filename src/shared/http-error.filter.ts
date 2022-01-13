import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { request, Response } from 'express';

@Catch()
export class HttpErrorFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    // ctx is short for context
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(error),
      'ExceptionFilter',
    );

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}
