import { Body, Controller, Delete, Get, Post, Req } from "@nestjs/common";

import { CreateUserSessionDto } from "./dto/create.user.session.dto";
import { getRepository } from "typeorm";
import { UserSession } from "./entities/user.session.entity";
import { User } from "../users/entities/user.entity";

import crypto from "crypto";

export class NotLoggedInException extends Error {}
export class SessionNotFoundException extends Error {}
export class UserNotFoundException extends Error {}

@Controller("user-sessions")
export class UserSessionsController {
  @Get()
  async findCurrent(@Req() req) {
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      throw new NotLoggedInException();
    }

    const session = await getRepository(UserSession).findOne({
      token: sessionToken,
    });

    if (!session) {
      throw new SessionNotFoundException();
    }

    const user = await getRepository(User).findOne({
      id: session.userId,
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user.getDto();
  }

  @Delete()
  async removeCurrent(@Req() req) {
    return await getRepository(UserSession).delete({
      token: req.cookies.sessionToken,
    });
  }
}
