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

  async findAllFromUser(userId: User['id']): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.find({
      where: { user: { id: userId } },
    });
    return tasks.map((task) => TaskResponseFactory.for(task));
  }

  async findOneFromUser(
    userId: User['id'],
    taskId: Task['id'],
  ): Promise<TaskResponseDto> {
    try {
      const task = await this.tasksRepository.findOneOrFail({
        where: { id: taskId, user: { id: userId } },
      });
      return TaskResponseFactory.for(task);
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  async updateFromUser(
    userId: User['id'],
    taskId: Task['id'],
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    await this.validateTaskExists({ userId, taskId });

    const task = await this.tasksRepository.preload({
      id: taskId,
      ...updateTaskDto,
    });
    const updatedTask = await this.tasksRepository.save(task!);

    return TaskResponseFactory.for(updatedTask);
  }

  async removeFromUser(userId: User['id'], taskId: Task['id']): Promise<void> {
    await this.validateTaskExists({ userId, taskId });
    await this.tasksRepository.delete(taskId);
  }

  async validateTaskExists({
    userId,
    taskId,
  }: {
    userId: User['id'];
    taskId: Task['id'];
  }): Promise<void> {
    const exists = await this.tasksRepository.exists({
      where: { id: taskId, user: { id: userId } },
    });
    if (!exists) {
      throw new NotFoundException('Task not found');
    }
  }

  async findOne(taskId: Task['id']): Promise<TaskResponseDto> {
    try {
      const task = await this.tasksRepository.findOneOrFail({
        where: { id: taskId },
        relations: ['user'],
        select: {
          id: true,
          title: true,
          description: true,
          dueDate: true,
          user: {
            id: true,
          },
        },
      });
      return TaskResponseFactory.for(task);
    } catch {
      throw new NotFoundException('Task not found');
    }
  }
}
