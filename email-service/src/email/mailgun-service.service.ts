import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { StorageService } from 'src/common/services/storage/storage.service';
import { envs } from 'src/config';

@Injectable()
export class MailgunServiceService {
  private readonly mailgunClient;

  constructor(private readonly storageService: StorageService) {
    this.mailgunClient = mailgun({
      apiKey: envs.mailgunApiKey,
      domain: envs.mailgunDomain,
    });
  }

  async sendEmail({ to, subject, body, attachments }) {
    const files = attachments && (await this.getAttachments(attachments));
    const data = {
      from: envs.emailFrom,
      to,
      subject,
      text: body,
      attachment: files,
    };

    try {
      return await this.mailgunClient.messages().send(data);
    } catch (error) {
      throw new Error(`Error en Mailgun: ${error.message}`);
    }
  }

  async getAttachments(attachments: any[]) {
    return await Promise.all(
      attachments.map(async (key) => {
        const fileBuffer = await this.storageService.getFile(key);
        const filename = key.split('/').pop() || 'file';
        return new this.mailgunClient.Attachment({
          data: fileBuffer,
          filename,
        });
      }),
    );
  }
}
