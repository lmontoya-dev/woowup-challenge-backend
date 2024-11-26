import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { dbConfig, redisConfig } from './config';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BullModule.forRoot(redisConfig),
    EmailModule,
    TypeOrmModule.forRoot(dbConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
