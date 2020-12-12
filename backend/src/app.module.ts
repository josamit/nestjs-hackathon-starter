import {
  Injectable,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfig } from "./typeorm";
import { Request, Response } from "express";
import { User } from "./users/entities/user.entity";
import { Type } from "@nestjs/common/interfaces/type.interface";
import { DynamicModule } from "@nestjs/common/interfaces/modules/dynamic-module.interface";
import { ForwardReference } from "@nestjs/common/interfaces/modules/forward-reference.interface";
import { AuthModule } from "./auth/auth.module";
import { UserSessionsModule } from "./user-sessions/user.sessions.module";
import { UsersModule } from "./users/users.module";
import { getRepository } from "typeorm";
import { UserSession } from "./user-sessions/entities/user.session.entity";

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: Request & { user?: User | null }, res: Response, next) {
    const sessionToken = req.cookies.sessionToken;
    const session = await getRepository(UserSession).findOne({
      token: sessionToken,
    });

    if (!session) {
      req.user = null;
    }

    req.user = await getRepository(User).findOne({
      id: session.userId,
    });

    next();
  }
}

let imports: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [];

imports = imports.concat([
  AuthModule,
  UsersModule,
  UserSessionsModule,
  TypeOrmModule.forRoot(typeormConfig),
]);

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes("domains*");
  }
}
