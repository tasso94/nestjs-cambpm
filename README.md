<p align="center">
  <a href="http://nestjs.com"><img src="https://nestjs.com/img/logo_text.svg" alt="Nest Logo" width="320" /></a>
</p>

# NestJS Connector: Camunda External Task Client

## Example

1. Clone the repository
2. Run `npm i && npm run build`
3. Go to `examples/microservice`
4. Run `npm i` and `npm start`

```typescript
// src/app.controller.ts
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
```