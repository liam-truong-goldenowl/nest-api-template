import { ApiProperty } from '@nestjs/swagger';

import { TaskStatus } from '@/common/enums';

export class TaskResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({
    example: TaskStatus.PENDING,
    enum: TaskStatus,
  })
  status: TaskStatus;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
  })
  dueDate?: Date;
}
