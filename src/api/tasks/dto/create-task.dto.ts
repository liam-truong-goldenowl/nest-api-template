import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

import { TaskStatus } from '@/common/enums';

@ApiSchema({
  name: 'CreateTaskRequest',
  description: 'Data transfer object for creating a task',
})
export class CreateTaskDto {
  @ApiProperty({ example: 'Task title', minLength: 1, maxLength: 255 })
  title: string;

  @ApiPropertyOptional({
    example: 'Task description',
    minLength: 0,
    maxLength: 1_000,
  })
  description?: string;

  @ApiProperty({ example: TaskStatus.PENDING, enum: TaskStatus })
  status: TaskStatus = TaskStatus.PENDING;

  @ApiPropertyOptional({ example: '2023-10-01T00:00:00Z' })
  dueDate?: Date;

  @ApiProperty({ example: 1, description: 'ID of the user who owns the task' })
  userId: number;
}
