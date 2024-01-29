import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const serverConfig = app.get(ConfigService).get('server');

  app.setGlobalPrefix(serverConfig.apiPrefix);
  await app.listen(serverConfig.port, '0.0.0.0');

  Logger.log(`Server is running on ${await app.getUrl()}`);
}

bootstrap();
