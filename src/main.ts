import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule);

  await app.listen();
}
bootstrap();
