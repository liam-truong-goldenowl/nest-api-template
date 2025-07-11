import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  findAll() {
    return [
      { id: 1, title: 'Course 1' },
      { id: 2, title: 'Course 2' },
      { id: 3, title: 'Course 3' },
    ];
  }
}
