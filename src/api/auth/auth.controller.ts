import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Get,
  Body,
  Post,
  Request,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './guards/auth.guard';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn({
      username: signInDto.username,
      password: signInDto.password,
    });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@Request() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return req['user'];
  }
}
