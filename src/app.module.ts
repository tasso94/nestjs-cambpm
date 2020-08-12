import { Module, Provider } from '@nestjs/common';
import { ExternalTaskServer } from './app.server';
import { Client, ClientConfig } from 'camunda-external-task-client-js';

const CONNECTION_PROVIDER = 'CONNECTION_PROVIDER';

@Module({})
export class ExternalTaskModule {
  public static createClient(config: ClientConfig): Provider {
    return {
      provide: CONNECTION_PROVIDER,
      useFactory: async () => {
        return new Client(config);
      },
    };
  }
}
