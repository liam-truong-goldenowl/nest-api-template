import { createParamDecorator } from '@nestjs/common';

const exampleUser = {
  id: 1,
  username: 'exampleUser',
  email: 'example@example.com',
} as const;

export const User = createParamDecorator((field?: keyof typeof exampleUser) => {
  return field ? exampleUser[field] : exampleUser;
});
