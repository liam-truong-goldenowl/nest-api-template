import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../users/entities/user.entity';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskResponseFactory } from './factories/task-response.factory';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(
    userId: User['id'],
    createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: userId },
    });
    const createdTask = await this.tasksRepository.save(task);

    return TaskResponseFactory.for(createdTask);
  }

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.find();
    return tasks.map((task) => TaskResponseFactory.for(task));
  }

  async findOne(id: number): Promise<TaskResponseDto> {
    try {
      const task = await this.tasksRepository.findOneOrFail({ where: { id } });
      return TaskResponseFactory.for(task);
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    await this.validateTaskExists(id);

    const task = await this.tasksRepository.preload({ id, ...updateTaskDto });
    const updatedTask = await this.tasksRepository.save(task!);

    return TaskResponseFactory.for(updatedTask);
  }

  async remove(id: number): Promise<void> {
    await this.validateTaskExists(id);
    await this.tasksRepository.delete(id);
  }

  async validateTaskExists(id: number): Promise<void> {
    const exists = await this.tasksRepository.exists({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Task not found');
    }
  }
}
