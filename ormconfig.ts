import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenvConfig();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  ssl: configService.get('DB_SSL', 'false') === 'true',
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/src/api/**/*.entity.ts`],
  migrations: [`${__dirname}/src/database/migrations/*.ts`],
  namingStrategy: new SnakeNamingStrategy(),
});
