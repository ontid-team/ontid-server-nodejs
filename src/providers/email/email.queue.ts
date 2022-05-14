import Bull from 'bull';
import ms from 'ms';

import { EmailConfig } from '@config';
import { Logger, Queue } from '@lib';
import { FullUser } from '@modules/user';
import { LoggerType } from '@utils';
import { EventEmitter } from '@utils/helpers';

import {
  EMAIL_QUEUQ,
  EMAIL_FORGOT_PASSWORD,
  EMAIL_REGISTER,
} from './email.constant';
import EmailService from './email.service';

class EmailQueue extends Queue {
  constructor() {
    super(EMAIL_QUEUQ, {
      defaultJobOptions: {
        attempts: 30,
        backoff: {
          type: 'exponential',
          delay: ms('1s'),
        },
      },
    });

    this.process();
  }

  addForgotPasswordToQueue(
    data: Pick<FullUser, 'email'> & { token: string },
    opt?: Bull.JobOptions,
  ) {
    void this.queue.add(EMAIL_FORGOT_PASSWORD, data, opt);
  }

  addRegisterToQueue(data: Pick<FullUser, 'email'>, opt?: Bull.JobOptions) {
    void this.queue.add(EMAIL_REGISTER, data, opt);
  }

  private process() {
    EventEmitter.once('start', () => {
      void this.queue.process(
        EMAIL_FORGOT_PASSWORD,
        async (job: Bull.Job<Pick<FullUser, 'email'> & { token: string }>) => {
          try {
            const { email, token } = job.data;

            await EmailService.sendEmail({
              to: email,
              from: EmailConfig.username,
              subject: 'Forgot password',
              text: 'Forgot password',
              html: `Token: ${token}`,
            });

            await job.progress(100);

            return await Promise.resolve();
          } catch (error) {
            Logger.error({
              message: `${EMAIL_QUEUQ} ${EMAIL_FORGOT_PASSWORD}`,
              error,
              type: LoggerType.QUEUE,
            });

            return Promise.reject(error);
          }
        },
      );

      void this.queue.process(
        EMAIL_REGISTER,
        async (job: Bull.Job<Pick<FullUser, 'email'>>) => {
          try {
            const { email } = job.data;

            await EmailService.sendEmail({
              to: email,
              from: EmailConfig.username,
              subject: 'Register',
              text: 'Register',
              html: `Email: ${email}`,
            });

            await job.progress(100);

            return await Promise.resolve();
          } catch (error) {
            Logger.error({
              message: `${EMAIL_QUEUQ} ${EMAIL_REGISTER}`,
              error,
              type: LoggerType.QUEUE,
            });

            return Promise.reject(error);
          }
        },
      );
    });
  }
}

export default new EmailQueue();
