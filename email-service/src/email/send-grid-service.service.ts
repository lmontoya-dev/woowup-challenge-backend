import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { StorageService } from 'src/common/services/storage/storage.service';
import { envs } from 'src/config';

@Injectable()
export class SendGridServiceService {
  constructor(private readonly storageService: StorageService) {
    sendgrid.setApiKey(envs.sendgridApiKey);
  }
  async sendEmail({ to, subject, body, attachments }) {
    const attachmentFiles = await this.getAttachments(attachments);
    const msg = {
      to,
      from: envs.emailFrom,
      subject,
      text: body,
      attachments: attachmentFiles,
    };
    try {
      await sendgrid.send(msg);
    } catch (error) {
      throw new Error(`Error en SendGrid: ${error.message}`);
    }
  }

  async getAttachments(attachments: any[]) {
    return await Promise.all(
      attachments.map(async (key) => {
        const fileBuffer = await this.storageService.getFile(key);
        return {
          content: fileBuffer.toString('base64'),
          filename: key,
          type: 'application/octet-stream',
          disposition: 'attachment',
        };
      }),
    );
  }
}
