import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KakfaConsumerService extends ServerKafka implements OnModuleDestroy {
   constructor() {
      super({
         client: {
            clientId: 'notifications',
            brokers: ['sweeping-barnacle-6424-us1-kafka.upstash.io:9092'],
            sasl: {
               mechanism: 'scram-sha-256',
               username: 'c3dlZXBpbmctYmFybmFjbGUtNjQyNCTVzD1V3nO-3f6w5gBZEeFFVmVtYlH7g0c',
               password: 't3ijhBbDylgg9BZKll-T34vaJ6Q8WS1L4zrkwa8kdLyfYvv2yIkMrD4-QX1JHIhhjwbfxw==',
            },
            ssl: true,
         },
      });
   }

   async onModuleDestroy() {
      await this.close();
   }
}
