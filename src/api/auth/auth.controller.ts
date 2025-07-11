import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Get,
  Body,
  Post,
  Request,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';

import { Public, ReqUser } from '@/decorators/api.decorator';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn({
      username: signInDto.username,
      password: signInDto.password,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@ReqUser() user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }

  @Public()
  @Get('public')
  getPublicData() {
    return { message: 'This is public data' };
  }
}
