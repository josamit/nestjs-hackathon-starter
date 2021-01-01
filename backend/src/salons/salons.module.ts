import { Module } from "@nestjs/common";
import { SalonsService } from "./salons.service";
import { SalonsController } from "./salons.controller";

@Module({
  controllers: [SalonsController],
  providers: [SalonsService],
})
export class SalonsModule {}
