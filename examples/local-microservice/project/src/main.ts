import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExternalTaskConnector } from 'nestjs-cambpm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: app.get(ExternalTaskConnector),
  });

  await app.startAllMicroservicesAsync();
}
bootstrap();
