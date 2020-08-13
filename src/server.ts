import {
  Server,
  CustomTransportStrategy,
  MessageHandler,
} from '@nestjs/microservices';
import {
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import { Client } from 'camunda-external-task-client-js';

@Injectable()
export class ExternalTaskServer extends Server
  implements CustomTransportStrategy {
  constructor(@Inject('CONNECTION_PROVIDER') private readonly client: Client) {
    super();
  }

  public async listen(callback: () => void) {
    this.init();
    callback();
  }

  public close() {
    this.client.stop();
    Logger.log('External Task Client stopped', 'ExternalTaskServer')
  }

  protected init(): void {
    this.client.start();

    Logger.log('External Task Client started', 'ExternalTaskServer')

    const handlers = this.getHandlers();
    handlers.forEach((messageHandler: MessageHandler, key: string) => {
      let jsonKey = JSON.parse(key);
      this.client.subscribe(
        jsonKey.topic,
        jsonKey.options,
        ({ task, taskService }) => {
          messageHandler(task, taskService);
        },
      );
    });
  }
}
