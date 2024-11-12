import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { redisConfig } from './config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [BullModule.forRoot(redisConfig), EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
