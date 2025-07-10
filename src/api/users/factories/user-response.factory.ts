import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserResponseFactory {
  static for(user: User): UserResponseDto {
    const userResponse = new UserResponseDto();

    userResponse.id = user.id;
    userResponse.createdAt = user.createdAt;
    userResponse.updatedAt = user.updatedAt;
    userResponse.username = user.username;
    userResponse.email = user.email;
    userResponse.avatarUrl = user.avatarUrl || null;

    return userResponse;
  }
}
