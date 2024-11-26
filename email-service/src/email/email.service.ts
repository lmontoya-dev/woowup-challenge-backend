import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { QueueAdapter } from 'src/adapters/queue/queue.adapter.interface';
import { envs } from 'src/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  constructor(
    @Inject('QueueAdapter') private readonly queueAdapter: QueueAdapter,
    @InjectRepository(Email)
    private readonly emailRespository: Repository<Email>,
  ) {}
  async create(createEmailDto: CreateEmailDto, attachments) {
    try {
      await this.emailRespository.save({
        ...createEmailDto,
        files: attachments,
      });
      const { data } = await this.queueAdapter.saveSendEmail(
        envs.redisQueueWorkEmail,
        {
          ...createEmailDto,
          attachments,
        },
      );
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Internal Error: ${error.message}`,
      );
    }
  }
}
