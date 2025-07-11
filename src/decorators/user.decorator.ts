import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(() => {
  return {
    id: 1, // Example user ID
    username: 'exampleUser', // Example username
    email: 'example@example.com', // Example email
  };
});
