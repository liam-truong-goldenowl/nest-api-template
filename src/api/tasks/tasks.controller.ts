import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { ReqUser, TReqUser } from '@/decorators/api.decorator';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskOwnerGuard } from './guards/task-owner.guard';

@ApiBearerAuth()
@Controller('users/tasks')
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
  create(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
    @ReqUser() user: TReqUser,
  ) {
    return this.tasksService.create(user.id, createTaskDto);
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
  findAll(@ReqUser() user: TReqUser) {
    return this.tasksService.findAllFromUser(user.id);
  }

  @Get(':id')
  @UseGuards(TaskOwnerGuard)
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
  findOne(
    @Param('id', ParseIntPipe) taskId: number,
    @ReqUser() user: TReqUser,
  ) {
    return this.tasksService.findOneFromUser(user.id, taskId);
  }

  @Patch(':id')
  @UseGuards(TaskOwnerGuard)
  @ApiOperation({
    summary: 'Update a task by ID',
  })
  @ApiOkResponse({
    description: 'The task has been successfully updated.',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @ApiBadRequestResponse({
    description:
      'Bad Request. The input data is invalid or the ID provided is invalid.',
  })
  update(
    @ReqUser() user: TReqUser,
    @Param('id', ParseIntPipe) taskId: number,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateFromUser(user.id, taskId, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(TaskOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a task by ID',
  })
  @ApiNoContentResponse({
    description: 'The task has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The ID provided is invalid.',
  })
  remove(@ReqUser() user: TReqUser, @Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.removeFromUser(user.id, taskId);
  }
}
