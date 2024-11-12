import { S3 } from '@aws-sdk/client-s3';
import { envs } from './envs.config';

export const s3 = new S3({
  region: envs.awsRegion,
  credentials: {
    accessKeyId: envs.awsAccesKeyId,
    secretAccessKey: envs.awsSecretAccessKey,
  },
});
