import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiErrorCodes } from 'libs/api/api.error.codes';
import { SentryExceptionCaptured } from '@sentry/nestjs';

type ExceptionResponse =
  | string
  | { message: string | string[]; errorCode: string };

const genericHttpExceptionErrorCodes: Record<string, string> = {
  '400': ApiErrorCodes.BAD_REQUEST,
  '429': ApiErrorCodes.TOO_MANY_REQUESTS,
  '500': ApiErrorCodes.INTERNAL_SERVER_ERROR,
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger(HttpExceptionFilter.name);

  @SentryExceptionCaptured()
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message: string | Record<string, string> = 'Something went wrong!';
    let errorCode: string = ApiErrorCodes.UNKNOWN_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as ExceptionResponse;
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        Object.hasOwn(exceptionResponse, 'message')
      ) {
        const excMessage = exceptionResponse.message;
        if (Array.isArray(excMessage)) {
          message = excMessage.join(', ');
        } else {
          message = excMessage;
        }
        if (exceptionResponse?.errorCode) {
          errorCode = exceptionResponse?.errorCode;
        }
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorCode = ApiErrorCodes.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      this.logger.error(exception);
    }
    if (
      genericHttpExceptionErrorCodes[String(status)] &&
      errorCode === ApiErrorCodes.UNKNOWN_ERROR
    ) {
      errorCode = genericHttpExceptionErrorCodes[String(status)];
    }
    response.status(status).json({
      errorCode,
      status: false,
      message,
      data: null,
    });
  }
}
