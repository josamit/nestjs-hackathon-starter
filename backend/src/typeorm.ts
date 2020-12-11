import { Session } from './sessions/entities/session.entity';
import { User } from './users/entities/user.entity';
import { createConnection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const host = 'localhost';
const port = 33306;

export const typeormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host,
  port,
  username: 'booking_manager_dev',
  password: 'booking_manager_mysql_amazing_db_dev',
  database: 'booking_manager',
  entities: [Session, User],
  logging: true,
  synchronize: true,
};

export default async function createConn() {
  return createConnection(typeormConfig);
}
