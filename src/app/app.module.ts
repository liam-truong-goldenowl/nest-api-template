import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/api/auth/auth.module';
import { TasksModule } from '@/api/tasks/tasks.module';
import { DatabaseModule } from '@/database/database.module';
import { CoursesModule } from '@/api/courses/courses.module';
import {
  appConfig,
  EnvSchema,
  jwtConfig,
  swaggerConfig,
  typeOrmConfig,
} from '@/config';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvSchema,
      load: [appConfig, typeOrmConfig, swaggerConfig, jwtConfig],
    }),
    AuthModule,
    TasksModule,
    CoursesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
