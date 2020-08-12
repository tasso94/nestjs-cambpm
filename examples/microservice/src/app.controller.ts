import { Controller } from '@nestjs/common';
import { Ctx, Payload } from '@nestjs/microservices';
import { Subscription } from '@nestjs/camunda-external-task-client-js';

import {
  SubscribeOptions,
  Task,
  TaskService,
} from 'camunda-external-task-client-js';

@Controller()
export class AppController {
  subscribeOptions: SubscribeOptions = {
    lockDuration: 500,
  };

  @Subscription('payment-service', this.subscribeOptions)
  paymentService(@Payload() task: Task, @Ctx() taskService: TaskService) {
    console.log('hello ' + task.id);
    taskService.complete(task);
  }

  @Subscription('something-else', this.subscribeOptions)
  somethingElse(@Payload() task: Task, @Ctx() taskService: TaskService) {
    console.log('something else');
    console.log('hello ' + task.id);
  }
}
