import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_session")
export class UserSession {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column()
  token: string;

  @Index()
  @Column()
  userId: string;
}
