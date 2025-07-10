import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The input data is invalid.',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns a list of all tasks.',
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns a task by its ID.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The ID provided is invalid.',
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
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
