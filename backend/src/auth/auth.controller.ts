import { Body, Controller, Post } from "@nestjs/common";
import { Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { getRepository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { validationError } from "../quick-utils";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { UserSession } from "../user-sessions/entities/user.session.entity";

export function ok(user: Partial<User>): Partial<User> {
  return { ...user };
}

const salt = bcrypt.genSaltSync(10);

@Controller("auth")
export class AuthController {
  @Post("login")
  async login(@Body() body, @Res() res) {
    const user = await getRepository(User).findOne({
      email: body.email,
    });

    const isCorrect = async (user): Promise<boolean> =>
      await bcrypt.compare(body.password, user.password);

    if (!user) {
      validationError({
        message: `Unable to find user with email : ${body.email}`,
      });
      return;
    }

    if (await isCorrect(user)) {
      // res, user.id
      const sessionToken = crypto.randomBytes(32).toString("base64");
      await getRepository(UserSession).insert({
        userId: user.id,
        token: sessionToken,
      });

      res.cookie("sessionToken", sessionToken);
      res.send(ok(user.getDto()));
      return;
    }

    validationError({
      message:
        "Invalid login credentials, please try again with valid credentials.",
    });
  }

  @Post("register")
  async register(@Body() body, @Res() res) {
    const password = bcrypt.hashSync(body.password, salt);

    const user = await getRepository(User).insert({
      email: body.email,
      password,
      canAccessAdminDashboard: false,
    });

    const sessionToken = crypto.randomBytes(32).toString("base64");
    await getRepository(UserSession).insert({
      userId: user.identifiers[0].id,
      token: sessionToken,
    });

    res.cookie("sessionToken", sessionToken);
    res.send(
      ok({
        email: user.identifiers[0].email,
        canAccessAdminDashboard: user.identifiers[0].canAccessAdminDashboard,
      }),
    );
  }
}
