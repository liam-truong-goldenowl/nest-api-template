import {
  IsInt,
  IsDate,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  description: 'Data transfer object for creating a task',
})
export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @ApiProperty({ example: 'Task title', minLength: 5, maxLength: 255 })
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(1_000)
  @ApiPropertyOptional({
    example: 'Task description',
    minLength: 10,
    maxLength: 1_000,
  })
  description?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @ApiPropertyOptional({ example: '2023-10-01' })
  dueDate?: Date;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ID of the user who owns the task' })
  userId: number;
}
