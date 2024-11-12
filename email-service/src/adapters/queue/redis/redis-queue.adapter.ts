import { Injectable, Logger } from '@nestjs/common';
import { QueueAdapter, QueueJobOptions } from '../queue.adapter.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { envs } from 'src/config';
import { EmailJobData } from 'src/common/interfaces/email-job-data.interface';

@Injectable()
export class RedisQueueAdapter implements QueueAdapter {
  private readonly logger = new Logger(RedisQueueAdapter.name);

  constructor(
    @InjectQueue(envs.redisQueueEmail) private readonly emailQueue: Queue,
    @InjectQueue(envs.redisQueueFailEmail)
    private readonly emailFailQueue: Queue,
  ) {}

  async saveSendEmail(name: string, message: EmailJobData): Promise<void> {
    return this.addToQueue({
      queue: this.emailQueue,
      name,
      message,
      attempts: envs.redisAttempts,
      backoffDelay: envs.redisDelay,
      backoffType: 'exponential',
    });
  }

  async saveFailEmail(name: string, message: EmailJobData): Promise<void> {
    return this.addToQueue({
      queue: this.emailFailQueue,
      name,
      message,
      attempts: envs.redisAttempts,
      backoffDelay: envs.redisDelay,
      backoffType: 'exponential',
    });
  }

  async addToQueue(options: QueueJobOptions): Promise<void> {
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
    } catch (error) {
      this.logger.error(
        `Failed to add job '${name}' to queue: ${error.message}`,
      );
      throw new Error(`Failed to add job '${name}' to queue: ${error.message}`);
    }
  }
}
