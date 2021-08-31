import Bull from 'bull';
import ms from 'ms';

import { AppConfig, EmailConfig, RedisConfig } from '@config/index';
import { Logger } from '@core/index';
import { FullUser } from '@modules/user';
import { EventEmitter } from '@utils/index';

import {
  EMAIL_QUEUQ,
  EMAIL_FORGOT_PASSWORD,
  EMAIL_REGISTER,
} from './email.constant';
import EmailService from './email.service';

export const EmailQueue = new Bull(EMAIL_QUEUQ, {
  redis: {
    port: RedisConfig.port,
    host: RedisConfig.host,
    password: RedisConfig.password,
  },
  prefix: AppConfig.name,
  limiter: { max: 30, duration: ms('5s') },
  defaultJobOptions: {
    attempts: 30,
    backoff: {
      type: 'fixed',
      delay: ms('1m'),
    },
  },
});

EventEmitter.once('close', async () => {
  await EmailQueue.close();
});

EmailQueue.on('error', Logger.error);

EventEmitter.once('start', () => {
  EmailQueue.process(
    EMAIL_FORGOT_PASSWORD,
    async (job: Bull.Job<Pick<FullUser, 'email'> & { token: string }>) => {
      try {
        const { email } = job.data;

        const result = await EmailService.sendEmail({
          to: email,
          from: EmailConfig.username,
          subject: 'Forgot password',
          text: 'Forgot password',
        });

        await job.progress(100);

        return Promise.resolve(result);
      } catch (err) {
        Logger.error(`${EMAIL_QUEUQ} ${EMAIL_FORGOT_PASSWORD}`, err);

        return Promise.reject(err);
      }
    },
  );

  EmailQueue.process(
    EMAIL_REGISTER,
    async (job: Bull.Job<Pick<FullUser, 'email'>>) => {
      try {
        const { email } = job.data;

        const result = await EmailService.sendEmail({
          to: email,
          from: EmailConfig.username,
          subject: 'Register',
          text: 'Register',
        });

        await job.progress(100);

        return Promise.resolve(result);
      } catch (err) {
        Logger.error(`${EMAIL_QUEUQ} ${EMAIL_REGISTER}`, err);

        return Promise.reject(err);
      }
    },
  );
});
