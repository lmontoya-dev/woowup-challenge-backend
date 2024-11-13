import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { envs, s3 } from 'src/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  async uploadFile(file: Express.Multer.File) {
    const key = 'attachments/' + uuidv4() + extname(file.originalname);
    const params = {
      Bucket: envs.awsS3Bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      return key;
    } catch (err) {
      throw new Error(
        `Failed to upload file "${file.originalname}" to S3. ${err.message}`,
      );
    }
  }

  async getUrlFile(key: string) {
    try {
      const params = { Bucket: envs.awsS3Bucket, Key: key };
      const command = new GetObjectCommand(params);
      return getSignedUrl(s3, command, { expiresIn: 300 });
    } catch (err) {
      throw new Error(
        `Failed to generate a signed URL for file with key "${key}". ${err.message}`,
      );
    }
  }

  async getFile(key: string) {
    const params = { Bucket: envs.awsS3Bucket, Key: key };
    try {
      const command = new GetObjectCommand(params);
      const { Body } = await s3.send(command);
      return await this.streamToBuffer(Body);
    } catch (err) {
      throw new Error(
        `Failed to retrieve file with key "${key}" from S3. ${err.message}`,
      );
    }
  }

  async streamToBuffer(stream): Promise<Buffer> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) =>
        reject(new Error(`Error reading Node.js stream: ${err.message}`)),
      );
    });
  }
}
