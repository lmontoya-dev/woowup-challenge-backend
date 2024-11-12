import { Inject, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { QueueAdapter } from 'src/adapters/queue/queue.adapter.interface';
import { envs } from 'src/config';

@Injectable()
export class EmailService {
  constructor(
    @Inject('QueueAdapter') private readonly queueAdapter: QueueAdapter,
  ) {}

  create(createEmailDto: CreateEmailDto, attachments) {
    this.queueAdapter.saveSendEmail(envs.redisQueueWorkEmail, {
      ...createEmailDto,
      attachments,
    });
  }
}
