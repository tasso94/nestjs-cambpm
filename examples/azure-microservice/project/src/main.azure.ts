import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExternalTaskServer } from 'nestjs-cambpm';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: app.get(ExternalTaskServer),
  });

  await app.startAllMicroservicesAsync();

  app.setGlobalPrefix('api');
  
  await app.init();
  return app;
}
