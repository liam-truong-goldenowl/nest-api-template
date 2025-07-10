import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from '../users/users.service';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseFactory } from './factories/task-response.factory';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private userService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const userExists = await this.userService.exists(createTaskDto.userId);

    if (!userExists) {
      throw new BadRequestException('User does not exist');
    }

    const task = this.tasksRepository.create(createTaskDto);
    const createdTask = await this.tasksRepository.save(task);

    return TaskResponseFactory.for(createdTask);
  }

  async findAll() {
    const tasks = await this.tasksRepository.find();
    return tasks.map((task) => TaskResponseFactory.for(task));
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return TaskResponseFactory.for(task);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
