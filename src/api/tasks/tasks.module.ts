import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';

import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
