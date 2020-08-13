import {
  Logger,
  Controller,
  Get
} from '@nestjs/common';
import { Ctx, Payload } from '@nestjs/microservices';

import {
  Task,
  TaskService,
  Variables,
  HandleFailureOptions,
} from 'camunda-external-task-client-js';

import { Subscription } from 'nestjs-cambpm';

@Controller()
export class AppController {

  @Get('/start')
  triggerAzureFunction(): string {
    return 'External Task client as Azure Function is up & running!';
  }

  @Subscription('my-external-task', {
    lockDuration: 500,
  })
  async myExternalTask(@Payload() task: Task, @Ctx() taskService: TaskService) {
    const businessKey = task.businessKey;
    const isBusinessKeyMissing = !businessKey;

    const processVariables = new Variables();
    processVariables.set('isBusinessKeyMissing', isBusinessKeyMissing);

    if (!isBusinessKeyMissing) {
      await taskService.complete(task, processVariables);
      Logger.log('External task successfully completed!');
    } else {
      const errorMessage = 'No business key given!';
      const options: HandleFailureOptions = {
        errorMessage: errorMessage,
      };
      await taskService.handleFailure(task, options);
      Logger.error(errorMessage);
    }
  }
}
