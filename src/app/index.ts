import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import type { INestApplication } from '@nestjs/common';

import { isDevelopmentEnv } from '@/utils/helpers';

import { AppModule } from './app.module';
import { genAPIDocument } from './app.document';

export const initApplication = async (): Promise<INestApplication> => {
  const isDevEnv = isDevelopmentEnv();

  const logLevels: LogLevel[] = isDevEnv
    ? ['error', 'warn', 'log', 'verbose', 'debug']
    : ['error', 'log', 'warn'];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  if (isDevEnv) {
    await genAPIDocument(app);
  }

  return app;
};
