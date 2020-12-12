import { Module } from "@nestjs/common";
import { UserSessionsController } from "./user.sessions.controller";

@Module({
  controllers: [UserSessionsController],
})
export class UserSessionsModule {}
