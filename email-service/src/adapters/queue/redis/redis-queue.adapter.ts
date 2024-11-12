import { Injectable, Logger } from '@nestjs/common';
import {
  EmailJobData,
  QueueAdapter,
  QueueJobOptions,
} from '../queue.adapter.interface';
import { InjectQueue } from '@nestjs/bull';
import Bull, { Queue } from 'bull';
import { envs } from 'src/config';

@Injectable()
export class RedisQueueAdapter implements QueueAdapter {
  private readonly logger = new Logger(RedisQueueAdapter.name);

  constructor(
    @InjectQueue(envs.redisQueueEmail) private readonly emailQueue: Queue,
    @InjectQueue(envs.redisQueueFailEmail)
    private readonly emailFailQueue: Queue,
  ) {}

  async saveSendEmail(
    name: string,
    message: EmailJobData,
  ): Promise<Bull.Job<any>> {
    return this.addToQueue({
      queue: this.emailQueue,
      name,
      message,
      attempts: envs.redisAttempts,
      backoffDelay: envs.redisDelay,
      backoffType: 'exponential',
    });
  }

  async saveFailEmail(
    name: string,
    message: EmailJobData,
  ): Promise<Bull.Job<any>> {
    return this.addToQueue({
      queue: this.emailFailQueue,
      name,
      message,
      attempts: envs.redisAttempts,
      backoffDelay: envs.redisDelay,
      backoffType: 'exponential',
    });
  }

  async addToQueue(options: QueueJobOptions): Promise<Bull.Job<any>> {
    const { queue, name, message, attempts, backoffDelay, backoffType } =
      options;
    try {
      const job = await queue.add(name, message, {
        attempts,
        backoff: { type: backoffType, delay: backoffDelay },
      });
      this.logger.log(
        `Job '${name}' added to queue successfully with ID: ${job.id}`,
      );
      return job;
    } catch (error) {
      this.logger.error(
        `Failed to add job '${name}' to queue: ${error.message}`,
      );
      throw new Error(`Failed to add job '${name}' to queue: ${error.message}`);
    }
  }
}
