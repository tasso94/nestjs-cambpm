import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExternalTaskConnector } from 'nestjs-cambpm';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: app.get(ExternalTaskConnector),
  });

  await app.startAllMicroservicesAsync();

  app.setGlobalPrefix('api');
  
  await app.init();
  return app;
}
