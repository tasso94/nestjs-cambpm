import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExternalTaskServer } from 'nestjs-cambpm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: app.get(ExternalTaskServer),
  });

  await app.startAllMicroservicesAsync();

  await app.listen(3000);
}
bootstrap();
