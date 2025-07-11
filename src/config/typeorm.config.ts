import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Env } from '@/utils/constants/envs';
import { getEnv } from '@/utils/helpers/envs';
import { mergeDeepRight } from '@/utils/helpers/objects';

export const typeOrmConfig = registerAs('typeorm', (): TypeOrmModuleOptions => {
  const baseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    ssl: process.env.DB_SSL === 'true' || false,

    username: process.env.DB_USERNAME ?? 'user',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_NAME ?? 'database',

    logging: false,
    synchronize: false,
    autoLoadEntities: true,

    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
  } satisfies TypeOrmModuleOptions;

  const appEnv = getEnv();

  const envSpecificConfig = {
    [Env.DEVELOPMENT]: {
      logging: true,
      migrationRun: true,
    },
    [Env.STAGING]: {
      logging: true,
      migrationRun: false,
    },
    [Env.PRODUCTION]: {
      logging: false,
      migrationRun: false,
    },
  };

  return mergeDeepRight(baseConfig, envSpecificConfig[appEnv] || {});
});
