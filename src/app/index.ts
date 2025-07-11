import { NestFactory } from '@nestjs/core';
import { LogLevel, RequestMethod } from '@nestjs/common';

import type { INestApplication } from '@nestjs/common';

import { isDevelopmentEnv } from '@/utils/helpers/envs';

import { AppModule } from './app.module';
import { genAPIDocument } from './app.document';
import { applyInterceptors } from './app.interceptor';

export const initApplication = async (): Promise<INestApplication> => {
  const isDevEnv = isDevelopmentEnv();

  const logLevels: LogLevel[] = isDevEnv
    ? ['error', 'warn', 'log', 'verbose', 'debug']
    : ['error', 'log', 'warn'];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  app.setGlobalPrefix('v1/api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  applyInterceptors(app);

  if (isDevEnv) {
    genAPIDocument(app);
  }

  return app;
};
