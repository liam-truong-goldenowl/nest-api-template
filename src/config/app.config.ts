import { registerAs } from '@nestjs/config';

export type TAppConfig = {
  port: number;
  environment: string;
};

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000'),
  environment: process.env.NODE_ENV || 'development',
}));
