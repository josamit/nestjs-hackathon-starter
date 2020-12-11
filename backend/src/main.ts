import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundErrorFilter } from './exceptions/entity-not-found.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationExceptionFilter } from './exceptions/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new EntityNotFoundErrorFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen(4050);
}
bootstrap();
