import { ApiSchema, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUrl,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

@ApiSchema({
  description: 'Data Transfer Object for creating a new user',
})
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({
    description: 'Unique username for the user',
    example: 'john_doe',
    minLength: 3,
    maxLength: 20,
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    description: 'Unique email address for the user',
    example: 'john_doe@example.com',
    format: 'email',
  })
  email: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({
    description: "URL of the user's avatar image",
    example: 'https://example.com/avatar/john_doe.png',
    nullable: true,
  })
  avatarUrl?: string;
}
