import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { NotLoggedInException } from "../user-sessions/user.sessions.controller";

@Catch(NotLoggedInException)
export class NotLoggedInExceptionFilter implements ExceptionFilter {
  catch(exception: NotLoggedInException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 422;

    response.status(status).json({
      statusCode: status,
      message: `${exception.message}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
