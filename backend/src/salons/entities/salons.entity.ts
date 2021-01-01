import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("salons")
export class Salons {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "point",
    srid: 4326,
  })
  coordinate: string;
}
