<p align="center">
  <a href="http://nestjs.com"><img src="https://nestjs.com/img/logo_text.svg" alt="Nest Logo" width="320" /></a>
</p>

# NestJS Connector for Camunda BPM Runtime

> Run your business logic anywhere

## Example

The full example can be found [here]. Please also see the [Azure Function Example].

[here]: https://github.com/tasso94/nestjs-cambpm/tree/master/examples/local-microservice
[Azure Function Example]: https://github.com/tasso94/nestjs-cambpm/tree/master/examples/azure-microservice

```typescript
// src/main.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: app.get(ExternalTaskServer),
  });

  await app.startAllMicroservicesAsync();
}
bootstrap();
```

```typescript
// src/app.module.ts

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
```

```typescript
// src/app.controller.ts

@Controller()
export class AppController {
  @Subscription('my-external-task', {
    lockDuration: 500,
  })
  async myExternalTask(@Payload() task: Task, @Ctx() taskService: TaskService) {
    const businessKey = task.businessKey;
    const isBusinessKeyMissing = !businessKey;

    const processVariables = new Variables();
    processVariables.set('isBusinessKeyMissing', isBusinessKeyMissing);

    if (!isBusinessKeyMissing) {
      // Complete the External Task
      await taskService.complete(task, processVariables);
      Logger.log('External task successfully completed!');

    } else {
      const errorMessage = 'No business key given!';
      const options: HandleFailureOptions = {
        errorMessage: errorMessage,
      };

      // Raise an incident
      await taskService.handleFailure(task, options);

      Logger.error(errorMessage);
    }
  }
}
```