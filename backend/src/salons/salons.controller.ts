import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { SalonsService } from "./salons.service";

@Controller("salons")
export class SalonsController {
  constructor(private readonly salonsService: SalonsService) {}

  @Get()
  findSalons(@Req() req) {
    return this.salonsService.find(req);
  }

  @Post()
  async addSalon(@Req() req) {
    return this.salonsService.add(req);
  }
}
