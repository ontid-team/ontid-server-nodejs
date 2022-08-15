import type { Job, JobOptions } from 'bull';
import { container } from 'tsyringe';

import { Queue, i18n } from '@lib';
import { EmailInject, IEmailQueue } from '@providers/email';
import { DateHelper, EventEmitter } from '@utils/helpers';

import { INotificationQueue } from './interface';
import {
  NOTIFICATION_FORGOT_PASSWORD,
  NOTIFICATION_QUEUQ,
  NOTIFICATION_REGISTER,
} from './notification.constant';
import { Notification, NotificationPassword } from './notification.type';

export default class NotificationQueue
  extends Queue
  implements INotificationQueue
{
  private readonly emailQueue: IEmailQueue;

  constructor() {
    super(NOTIFICATION_QUEUQ, {
      defaultJobOptions: {
        attempts: 30,
        backoff: {
          type: 'exponential',
          delay: DateHelper.toMs('1s'),
        },
      },
    });

    this.emailQueue = container.resolve<IEmailQueue>(EmailInject.EMAIL_QUEUE);
    this.process();
  }

  addForgotPasswordToQueue(data: NotificationPassword, opt?: JobOptions): void {
    void this.queue.add(NOTIFICATION_FORGOT_PASSWORD, data, opt);
  }

  addRegisterToQueue(data: Notification, opt?: JobOptions): void {
    void this.queue.add(NOTIFICATION_REGISTER, data, opt);
  }

  private process() {
    EventEmitter.once('start', () => {
      void this.queue.process(
        NOTIFICATION_FORGOT_PASSWORD,
        async (job: Job<NotificationPassword>) => {
          try {
            const { email } = job.data;

            if (email) {
              void this.emailQueue.addSendMessageToQueue({
                email,
                subject: i18n()['email.forgotPassword'],
              });
            }

            await job.progress(100);

            return await Promise.resolve();
          } catch (err) {
            this.handleError(err);

            return Promise.reject(err);
          }
        },
      );

      void this.queue.process(
        NOTIFICATION_REGISTER,
        async (job: Job<Notification>) => {
          try {
            const { email } = job.data;

            if (email) {
              void this.emailQueue.addSendMessageToQueue({
                email,
                subject: i18n()['email.register'],
              });
            }

            await job.progress(100);

            return await Promise.resolve();
          } catch (err) {
            this.handleError(err);

            return Promise.reject(err);
          }
        },
      );
    });
  }
}
