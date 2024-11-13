import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    { bufferLogs: true },
  );

  app.useLogger(app.get(Logger));
  await app.listen();
}
bootstrap();
