import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EntityNotFoundErrorFilter } from "./exceptions/entity.not.found.filter";
import * as cookieParser from "cookie-parser";
import { ValidationExceptionFilter } from "./exceptions/validation.filter";
import { NotLoggedInExceptionFilter } from "./exceptions/not.logged.in.filter";
import { SessionNotFoundExceptionFilter } from "./exceptions/session.not.found.filter";
import { UserNotFoundExceptionFilter } from "./exceptions/user.not.found.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(
    new EntityNotFoundErrorFilter(),
    new ValidationExceptionFilter(),
    new NotLoggedInExceptionFilter(),
    new SessionNotFoundExceptionFilter(),
    new UserNotFoundExceptionFilter(),
  );
  await app.listen(4050);
}

bootstrap();
