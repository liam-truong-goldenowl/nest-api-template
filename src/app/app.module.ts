import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TasksModule } from '@/api/tasks/tasks.module';
import { UsersModule } from '@/api/users/users.module';
import { DatabaseModule } from '@/database/database.module';
import { appConfig, EnvSchema, typeOrmConfig, swaggerConfig } from '@/config';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvSchema,
      load: [appConfig, typeOrmConfig, swaggerConfig],
    }),
    TasksModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
