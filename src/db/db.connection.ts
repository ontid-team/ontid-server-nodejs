import { join } from 'path';

import { createConnection, Connection } from 'typeorm';

import { DBConfig, RedisConfig, AppConfig } from '@config/index';
import { ENV_PRODUCTION } from '@utils/index';

export default class DBConnection {
  async connect(): Promise<Connection> {
    return createConnection({
      type: 'postgres',
      host: DBConfig.host,
      port: DBConfig.port,
      username: DBConfig.user,
      password: DBConfig.password,
      database: DBConfig.database,
      entities: [join(__dirname, '/../modules/**/*.entity{.ts,.js}')],
      migrations: ['./migration/*.ts'],
      cli: {
        migrationsDir: './migration',
      },
      logging: DBConfig.debug,
      ...(AppConfig.env === ENV_PRODUCTION && {
        cache: {
          type: 'redis',
          options: {
            host: RedisConfig.host,
            port: RedisConfig.port,
          },
        },
      }),
    });
  }
}
