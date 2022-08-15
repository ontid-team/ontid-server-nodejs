import type { JobOptions } from 'bull';

import { Notification, NotificationPassword } from '../notification.type';

export interface INotificationQueue {
  addForgotPasswordToQueue(data: NotificationPassword, opt?: JobOptions): void;
  addRegisterToQueue(data: Notification, opt?: JobOptions): void;
}
