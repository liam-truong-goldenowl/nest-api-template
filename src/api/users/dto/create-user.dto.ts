import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  description: 'Data Transfer Object for creating a new user',
})
export class CreateUserDto {
  @ApiProperty({
    description: 'Unique username for the user',
    example: 'john_doe',
    uniqueItems: true,
    minLength: 3,
    maxLength: 20,
  })
  username: string;

  @ApiProperty({
    description: 'Unique email address for the user',
    example: 'john_doe@example.com',
    uniqueItems: true,
    format: 'email',
  })
  email: string;

  @ApiPropertyOptional({
    description: "URL of the user's avatar image",
    example: 'https://example.com/avatar/john_doe.png',
    nullable: true,
  })
  avatarUrl?: string;
}
