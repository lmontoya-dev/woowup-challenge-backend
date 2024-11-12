import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../common/services/storage/storage.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files[]'))
  async create(
    @Body() createEmailDto: CreateEmailDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const attachments = [];
    if (files) {
      for (const file of files) {
        const urlFile = await this.storageService.uploadFile(file);
        attachments.push(urlFile);
      }
    }
    await this.emailService.create(createEmailDto, attachments);
  }
}
