import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {ConfigService} from "@nestjs/config";
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = configService.get('application.port');
  await app.listen(port);

  Logger.log(
    `🚀 Notify service is running on: http://localhost:${port}/${globalPrefix}`
  );

  Logger.log(
    `🎯 Current mode: ${configService.get('application.environment')}`
  )
}

bootstrap();
