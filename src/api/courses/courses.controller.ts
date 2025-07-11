import { Get, Controller } from '@nestjs/common';

import { ReqUser } from '@/decorators/api.decorator';

import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(@ReqUser() user: { username: string; id: number; email: string }) {
    console.log('User Info:', user);
    return this.coursesService.findAll();
  }

  @Get('field')
  findField(@ReqUser('username') username: string) {
    console.log('Username:', username);
    return { username };
  }

  @Get('interceptor-test')
  findInterceptor() {
    console.log('This route is intercepted by LoggingInterceptor');
    return { message: 'This route is intercepted by LoggingInterceptor' };
  }
}
