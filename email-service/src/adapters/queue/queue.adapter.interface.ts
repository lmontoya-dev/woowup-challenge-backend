import Bull, { Queue } from 'bull';

export interface QueueAdapter {
  saveSendEmail(name: string, message: EmailJobData): Promise<Bull.Job<any>>;
  saveFailEmail(name: string, message: EmailJobData): Promise<Bull.Job<any>>;
  addToQueue(options: QueueJobOptions): Promise<Bull.Job<any>>;
}

export interface QueueJobOptions {
  queue: Queue;
  name: string;
  message: object | string;
  attempts?: number;
  backoffDelay?: number;
  backoffType?: 'fixed' | 'exponential';
}

export interface EmailJobData {
  to: string;
  subject: string;
  body: string;
  attachments?: any[];
}
