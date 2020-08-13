import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  ExternalTaskServer,
  ExternalTaskModule,
} from 'nestjs-cambpm';

@Module({
  controllers: [AppController],
  providers: [
    ExternalTaskServer,
    ExternalTaskModule.createClient({
      baseUrl: 'http://localhost:8080/engine-rest',
    }),
  ],
})
export class AppModule {}
