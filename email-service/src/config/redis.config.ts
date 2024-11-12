import { BullModuleOptions } from '@nestjs/bull';
import { envs } from './envs.config';

export const redisConfig: BullModuleOptions = {
  redis: {
    host: envs.redisHost,
    port: envs.redisPort,
  },
};
