import { faker } from '@faker-js/faker';

import { TaskStatus } from '@/common/enums';

import { Task } from '../entities';

export function createTask(): Task {
  const task = new Task();

  task.title = faker.string.sample(10);
  task.description = faker.lorem.sentence();
  task.status = faker.helpers.arrayElement(Object.values(TaskStatus));
  task.dueDate = faker.date.future();

  return task;
}
