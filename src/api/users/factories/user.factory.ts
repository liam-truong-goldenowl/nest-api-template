import { faker } from '@faker-js/faker';

import { User } from '../entities';

export function createUser(): User {
  const user = new User();

  user.username = faker.internet.username();
  user.email = faker.internet.email();
  user.avatarUrl = faker.image.avatar();

  return user;
}
