import { Test, TestingModule } from "@nestjs/testing";
import { UserSessionsController } from "./user.sessions.controller";

describe("SessionsController", () => {
  let controller: UserSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSessionsController],
    }).compile();

    controller = module.get<UserSessionsController>(UserSessionsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
