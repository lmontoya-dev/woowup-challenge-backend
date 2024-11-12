import { Processor, Process, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { envs } from 'src/config';
import { SendGridServiceService } from './send-grid-service.service';
import { MailgunServiceService } from './mailgun-service.service';
import { QueueAdapter } from 'src/adapters/queue/queue.adapter.interface';

@Processor(envs.redisQueueEmail)
@Injectable()
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private readonly sendGridService: SendGridServiceService,
    private readonly mailgunService: MailgunServiceService,
    @Inject('QueueAdapter') private readonly queueAdapter: QueueAdapter,
  ) {}

  @Process(envs.redisQueueWorkEmail)
  async handleSendEmailJob(job: Job<any>) {
    const emailProviders = [
      { name: 'Mailgun', service: this.mailgunService },
      { name: 'SendGrid', service: this.sendGridService },
    ];
    for (const provider of emailProviders) {
      try {
        await provider.service.sendEmail(job.data);
        return;
      } catch (error) {
        this.logger.error(`Error with ${provider.name}: ${error.message}`);
      }
    }
    throw new Error('All mail providers have failed');
  }

  @OnQueueFailed()
  async handleJobFailure(job: Job<any>, error: Error) {
    this.logger.error(
      `Job ${JSON.stringify(job.id)} ha fallado: ${error.message}`,
    );
    if (job.attemptsMade === envs.redisAttempts) {
      this.logger.log(`Job sent to fail_send_email`);
      this.queueAdapter.saveFailEmail(envs.redisQueueWorkFailEmail, job.data);
    }
  }
}
