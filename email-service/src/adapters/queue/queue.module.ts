import { Module } from '@nestjs/common';
import { RedisQueueAdapter } from './redis/redis-queue.adapter';
import { BullModule } from '@nestjs/bull';
import { envs } from 'src/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: envs.redisQueueEmail,
    }),
    BullModule.registerQueue({
      name: envs.redisQueueFailEmail,
    }),
  ],
  providers: [
    {
      provide: 'QueueAdapter',
      useClass: RedisQueueAdapter,
    },
  ],
  exports: ['QueueAdapter'],
})
export class QueueModule {}
