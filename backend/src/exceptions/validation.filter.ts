import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from '../quick-utils';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 422;

    response.status(status).json({
      statusCode: status,
      message: `${exception.message}`,
      fields: `${exception.fields}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
