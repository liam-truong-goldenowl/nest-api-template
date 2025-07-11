import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '@/common/dto/response.dto';

export class UserResponseDto extends ResponseDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatarUrl: string | null;
}
