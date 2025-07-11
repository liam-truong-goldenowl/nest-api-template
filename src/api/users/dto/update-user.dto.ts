import { ApiSchema, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

@ApiSchema({
  description: 'Data transfer object for updating a user',
})
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiPropertyOptional({
    example: 'john_doe',
    minLength: 3,
    maxLength: 20,
  })
  username?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    format: 'email',
  })
  email?: string;
}
