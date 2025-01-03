import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { QueueModule } from 'src/adapters/queue/queue.module';
import { EmailProcessor } from './email.processor';
import { SendGridServiceService } from './send-grid-service.service';
import { MailgunServiceService } from './mailgun-service.service';
import { StorageModule } from 'src/common/services/storage/storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';

@Module({
  controllers: [EmailController],
  imports: [QueueModule, StorageModule, TypeOrmModule.forFeature([Email])],
  providers: [
    EmailService,
    EmailProcessor,
    SendGridServiceService,
    MailgunServiceService,
  ],
})
export class EmailModule {}
