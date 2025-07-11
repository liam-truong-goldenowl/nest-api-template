import { Get, Controller } from '@nestjs/common';

import { User } from '@/decorators/user.decorator';

import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(@User() user: { username: string; id: number; email: string }) {
    console.log('User Info:', user);
    return this.coursesService.findAll();
  }

  @Get('field')
  findField(@User('username') username: string) {
    console.log('Username:', username);
    return { username };
  }
}
