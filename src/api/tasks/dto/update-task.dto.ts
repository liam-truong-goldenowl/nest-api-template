import {
  IsDate,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @ApiPropertyOptional({
    example: 'Updated task title',
    minLength: 5,
    maxLength: 255,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(1_000)
  @ApiPropertyOptional({
    example: 'Updated task description',
    minLength: 10,
    maxLength: 1_000,
  })
  description?: string;

  @IsOptional()
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @ApiPropertyOptional({ example: '2023-10-01' })
  dueDate?: Date;
}
