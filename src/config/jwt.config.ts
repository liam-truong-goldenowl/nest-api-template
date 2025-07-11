import { registerAs } from '@nestjs/config';

export type TJwtConfig = {
  secret: string;
  expiration: string; // e.g., '60s', '1h', '24h'
};

export const jwtConfig = registerAs(
  'jwt',
  (): TJwtConfig => ({
    secret: process.env.JWT_SECRET || 'defaultSecretKey',
    expiration: '1h',
  }),
);
