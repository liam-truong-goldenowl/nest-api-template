import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from '../users/users.service';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskResponseFactory } from './factories/task-response.factory';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private userService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const userExists = await this.userService.exists(createTaskDto.userId);

    if (!userExists) {
      throw new BadRequestException('User does not exist');
    }

    const task = this.tasksRepository.create(createTaskDto);
    const createdTask = await this.tasksRepository.save(task);

    return TaskResponseFactory.for(createdTask);
  }

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.find();
    return tasks.map((task) => TaskResponseFactory.for(task));
  }

  async findOne(id: number): Promise<TaskResponseDto> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return TaskResponseFactory.for(task);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    const updatedTask = await this.tasksRepository.save(task);

    return TaskResponseFactory.for(updatedTask);
  }

  async remove(id: number): Promise<void> {
    const taskExists = await this.tasksRepository.findOneBy({ id });

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.delete(id);
  }

  async exists(id: number): Promise<boolean> {
    const task = await this.tasksRepository.findOneBy({ id });
    return Boolean(task);
  }
}
