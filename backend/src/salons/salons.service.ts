import { Injectable } from "@nestjs/common";
import { getManager } from "typeorm";
import { Salons } from "./entities/salons.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class SalonsService {
  async find(req) {
    return await getManager()
      .createQueryBuilder(Salons, "Salons")
      .select()
      .setParameters({
        origin: `POINT(${req.query.lat} ${req.query.lng})`,
        radius: req.query.radius,
      })
      .where(
        "ST_Distance_Sphere(coordinate, ST_GeomFromText(:origin, 4326)) <= :radius",
      )
      .getMany();
  }

  async add(req) {
    return getManager()
      .createQueryBuilder(Salons, "Salons")
      .insert()
      .into(Salons, ["id", "coordinate"])
      .values({
        id: uuidv4(),
        coordinate: `POINT(${req.query.lat} ${req.query.lng})`,
      })
      .execute();
  }
}
