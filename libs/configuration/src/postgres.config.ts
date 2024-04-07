import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';
import { IDatabaseConfig } from './interfaces';

const coreDbConfig = config.get<IDatabaseConfig>('database');

/**
 * just pass this whole const in typeorm as options
 */
export const postgresConfiguration: TypeOrmModuleOptions = {
  host: coreDbConfig.host,
  port: coreDbConfig.port,
  username: coreDbConfig.username,
  password: coreDbConfig.password,
  database: coreDbConfig.database,
  logging: false,
  autoLoadEntities: true,
  synchronize: true,
};

Object.assign(postgresConfiguration, { type: coreDbConfig.type });
