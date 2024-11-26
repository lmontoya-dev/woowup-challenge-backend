import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs.config';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db', 
  port: 5432,
  username: envs.dbUser,
  password: envs.dbPassword,
  database: envs.dbName,
  autoLoadEntities: true,
  synchronize: true,
};
