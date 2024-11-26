import * as Joi from 'joi';
import 'dotenv/config';

interface EnvVars {
  PORT: number;
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_S3_BUCKET_NAME: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_QUEUE_DELAY: number;
  REDIS_QUEUE_ATTEMPTS: number;
  REDIS_QUEUE_EMAIL: string;
  REDIS_QUEUE_WORK_EMAIL: string;
  REDIS_QUEUE_FAIL_EMAIL: string;
  REDIS_QUEUE_WORK_FAIL_EMAIL: string;
  MAILGUN_API_KEY: string;
  SENDGRID_API_KEY: string;
  SEND_FROM_EMAIL: string;
  MAILGUN_DOMAIN: string;
  DB_PASSWORD: string;
  DB_USER: string;
  DB_NAME: string;
}

const envsSchema = Joi.object({
  PORT: Joi.number().required(),
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_QUEUE_DELAY: Joi.number().required(),
  REDIS_QUEUE_ATTEMPTS: Joi.number().required(),
  REDIS_QUEUE_EMAIL: Joi.string().required(),
  REDIS_QUEUE_WORK_EMAIL: Joi.string().required(),
  REDIS_QUEUE_WORK_FAIL_EMAIL: Joi.string().required(),
  MAILGUN_API_KEY: Joi.string().required(),
  SENDGRID_API_KEY: Joi.string().required(),
  SEND_FROM_EMAIL: Joi.string().required(),
  MAILGUN_DOMAIN: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_NAME: Joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation Error: ${error.message}`);
}

const envsVar: EnvVars = value;

export const envs = {
  port: envsVar.PORT,
  awsRegion: envsVar.AWS_REGION,
  awsAccesKeyId: envsVar.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: envsVar.AWS_SECRET_ACCESS_KEY,
  awsS3Bucket: envsVar.AWS_S3_BUCKET_NAME,
  redisHost: envsVar.REDIS_HOST,
  redisPort: envsVar.REDIS_PORT,
  redisDelay: envsVar.REDIS_QUEUE_DELAY,
  redisAttempts: envsVar.REDIS_QUEUE_ATTEMPTS,
  redisQueueEmail: envsVar.REDIS_QUEUE_EMAIL,
  redisQueueFailEmail: envsVar.REDIS_QUEUE_FAIL_EMAIL,
  redisQueueWorkEmail: envsVar.REDIS_QUEUE_WORK_EMAIL,
  redisQueueWorkFailEmail: envsVar.REDIS_QUEUE_WORK_FAIL_EMAIL,
  mailgunApiKey: envsVar.MAILGUN_API_KEY,
  sendgridApiKey: envsVar.SENDGRID_API_KEY,
  emailFrom: envsVar.SEND_FROM_EMAIL,
  mailgunDomain: envsVar.MAILGUN_DOMAIN,
  dbPassword: envsVar.DB_PASSWORD,
  dbUser: envsVar.DB_USER,
  dbName: envsVar.DB_NAME,
};
