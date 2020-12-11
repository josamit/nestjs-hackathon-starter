import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { getRepository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Session } from './entities/session.entity';
import { Response, Request } from 'express';
import { validationError } from '../quick-utils';

export function ok() {
  return {
    status: 'ok',
  };
}

async function createSession(res: Response, userId: string) {
  const sessionToken = crypto.randomBytes(32).toString('base64');
  getRepository(Session).insert({
    userId: userId,
    token: sessionToken,
  });

  res.cookie('sessionToken', sessionToken);
  res.send(ok());
}

async function deleteSession(req: Request) {
  getRepository(Session).delete({ token: req.cookies.sessionToken });
}

export class NotLoggedInException extends Error {}

export async function getUserOrNull(req: Request) {
  try {
    return getUser(req).catch((e) => null);
  } catch (e) {
    console.error('failed to retrieve user', e);
  }
  return null;
}

export async function getUser(req: Request) {
  const sessionToken = req.cookies.sessionToken;
  const session = await getRepository(Session).findOne({
    token: sessionToken,
  });

  if (!session) {
    throw new NotLoggedInException();
  }

  const user = await getRepository(User).findOne({
    id: session.userId,
  });

  if (!user) {
    throw new NotLoggedInException();
  }

  return user;
}

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('login')
  async login(@Body() body, @Res() res) {
    const user = await getRepository(User).findOne({
      email: body.email,
    });

    const isCorrect = bcrypt.compare(user.password, body.password);

    if (isCorrect) {
      createSession(res, user.id);
    }

    validationError({
      message: 'Invalid login credentials',
    });
  }

  @Post('register')
  async register(@Body() body, @Res() res) {
    const password = bcrypt.hashSync(body.password, 10);

    const user = await getRepository(User).insert({
      email: body.email,
      password,
    });

    createSession(res, user.identifiers[0].id);
  }

  @Get('me')
  async me(@Req() req) {
    const user = await getUser(req);

    return {
      email: user.email,
    };
  }

  @Delete('me')
  async deleteMe(@Req() req) {
    const user = await deleteSession(req);

    return {};
  }

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
