import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig } from '@/config/app.config';
import { TasksModule } from '@/api/tasks/tasks.module';
import { UsersModule } from '@/api/users/users.module';
import { typeOrmConfig } from '@/config/typeorm.config';
import { DatabaseModule } from '@/database/database.module';

import { AppController } from './app.controller';

const EnvSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('password'),
  DB_NAME: Joi.string().default('nest'),
  DB_SSL: Joi.boolean().default(false),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvSchema,
      load: [appConfig, typeOrmConfig, appConfig],
    }),
    TasksModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
