import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { SessionNotFoundException } from "../user-sessions/user.sessions.controller";

@Catch(SessionNotFoundException)
export class SessionNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: SessionNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 404;

    response.status(status).json({
      statusCode: status,
      message: `${exception.message}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
