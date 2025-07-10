import { ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  description: 'Data transfer object for updating a user',
})
export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'john_doe',
    minLength: 3,
    maxLength: 20,
  })
  username?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    format: 'email',
  })
  email?: string;
}
