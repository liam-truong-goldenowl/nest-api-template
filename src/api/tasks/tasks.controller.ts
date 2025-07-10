import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
  })
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The input data is invalid.',
  })
  create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
  })
  @ApiOkResponse({
    description: 'Returns a list of all tasks.',
    isArray: true,
    type: TaskResponseDto,
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a task by ID',
  })
  @ApiOkResponse({
    description: 'Returns a task by its ID.',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The ID provided is invalid.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The task has been successfully updated.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @ApiBadRequestResponse({
    description:
      'Bad Request. The input data is invalid or the ID provided is invalid.',
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The task has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The ID provided is invalid.',
  })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
