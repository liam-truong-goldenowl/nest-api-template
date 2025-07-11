import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import type { INestApplication } from '@nestjs/common';

import type { TSwaggerConfig } from '@/config';

export const genAPIDocument = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const config = configService.get<TSwaggerConfig>('swagger')!;

  const documentConfig = new DocumentBuilder()
    .setTitle(config.title)
    .setVersion(config.version)
    .setDescription(config.description)
    .addBearerAuth()
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(
    app,
    documentConfig,
    documentOptions,
  );

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: config.siteTitle,
  };

  SwaggerModule.setup('api/documentation', app, document, customOptions);
};
