import type { INestApplication } from '@nestjs/common';

import { LoggingInterceptor } from '@/interceptors/logging.interceptor';
import { ResponseInterceptor } from '@/interceptors/response.interceptor';

export const applyInterceptors = (app: INestApplication): void => {
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );
};
