import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserResponseFactory } from './factories/user-response.factory';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingEmailPromise = createUserDto.email
      ? this.validateUniqueEmail(createUserDto.email)
      : Promise.resolve();
    const existingUsernamePromise = createUserDto.username
      ? this.validateUniqueUsername(createUserDto.username)
      : Promise.resolve();

    await Promise.all([existingEmailPromise, existingUsernamePromise]);

    const user = this.usersRepository.create(createUserDto);
    const createdUser = await this.usersRepository.save(user);

    return UserResponseFactory.for(createdUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => UserResponseFactory.for(user));
  }

  async findOne(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.usersRepository.findOneOrFail({ where: { id } });
      return UserResponseFactory.for(user);
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    await this.validateUserExists(id);

    const { username, email } = updateUserDto;

    const existingUsernames = username
      ? this.usersRepository.findOne({ where: { username } })
      : Promise.resolve(null);
    const existingEmails = email
      ? this.usersRepository.findOne({ where: { email } })
      : Promise.resolve(null);

    const [existingUsername, existingEmail] = await Promise.all([
      existingUsernames,
      existingEmails,
    ]);

    if (existingUsername && existingUsername.id !== id) {
      throw new BadRequestException('Username already exists');
    }

    if (existingEmail && existingEmail.id !== id) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.usersRepository.preload({ id, ...updateUserDto });
    const updatedUser = await this.usersRepository.save(user!);

    return UserResponseFactory.for(updatedUser);
  }

  async remove(id: number): Promise<void> {
    await this.validateUserExists(id);
    await this.usersRepository.delete(id);
  }

  async validateUniqueEmail(email: string): Promise<void> {
    const emailExists = await this.usersRepository.exists({ where: { email } });
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }
  }

  async validateUniqueUsername(username: string): Promise<void> {
    const usernameExists = await this.usersRepository.exists({
      where: { username },
    });
    if (usernameExists) {
      throw new BadRequestException('Username already exists');
    }
  }

  async validateUserExists(id: number): Promise<void> {
    const userExists = await this.usersRepository.exists({ where: { id } });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
  }
}
