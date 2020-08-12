import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  ExternalTaskServer,
  ExternalTaskModule,
} from '@nestjs/camunda-external-task-client-js';

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
