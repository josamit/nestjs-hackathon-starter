import { Injectable, MiddlewareConsumer, Module, NestMiddleware, NestModule, } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeormConfig } from './typeorm'
import { Request, Response } from 'express'
import { getUserOrNull } from './sessions/sessions.controller'
import { User } from './users/entities/user.entity'
import { Type } from '@nestjs/common/interfaces/type.interface'
import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface'
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface'
import { AuthModule } from './auth/auth.module'
import { SessionsModule } from './sessions/sessions.module'
import { UsersModule } from './users/users.module'

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: Request & { user?: User | null }, res: Response, next) {
    req.user = await getUserOrNull(req);

    next();
  }
}

let imports: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [];

imports = imports.concat([
  AuthModule,
  UsersModule,
  SessionsModule,
  TypeOrmModule.forRoot(typeormConfig),
]);

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('domains*');
  }
}
