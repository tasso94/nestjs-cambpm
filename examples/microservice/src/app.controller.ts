import { Controller } from '@nestjs/common';
import { Ctx, Payload } from '@nestjs/microservices';
import { Subscription } from '@nestjs/camunda-external-task-client-js';

import {
  SubscribeOptions,
  Task,
  TaskService,
} from 'camunda-external-task-client-js';

const subscribeOptions: SubscribeOptions = {
  lockDuration: 500,
};

@Controller()
export class AppController {

  @Subscription('payment-service', subscribeOptions)
  paymentService(@Payload() task: Task, @Ctx() taskService: TaskService) {
    console.log('hello ' + task.id);
    taskService.complete(task);
  }

  @Subscription('something-else', subscribeOptions)
  somethingElse(@Payload() task: Task, @Ctx() taskService: TaskService) {
    console.log('something else');
    console.log('hello ' + task.id);
  }

}
