import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { KakfaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const kakfaConsumerService = app.get(KakfaConsumerService);

   app.useGlobalPipes(new ValidationPipe());

   app.connectMicroservice<MicroserviceOptions>({ strategy: kakfaConsumerService });

   await app.startAllMicroservices();

   await app.listen(3000);
}
bootstrap();
