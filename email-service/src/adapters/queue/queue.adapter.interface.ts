import { Queue } from 'bull';
import { EmailJobData } from 'src/common/interfaces/email-job-data.interface';

export interface QueueAdapter {
  saveSendEmail(name: string, message: EmailJobData): Promise<void>;
  saveFailEmail(name: string, message: EmailJobData): Promise<void>;
  addToQueue(options: QueueJobOptions): Promise<void>;
}

export interface QueueJobOptions {
  queue: Queue;
  name: string;
  message: object | string;
  attempts?: number;
  backoffDelay?: number;
  backoffType?: 'fixed' | 'exponential';
}
