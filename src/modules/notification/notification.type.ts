export enum NotificationInject {
  NOTIFICATION_QUEUE = 'NotificationQueue',
}

export type Notification = {
  email?: string;
  phone?: string;
  userId?: number;
};

export type NotificationPassword = Notification & {
  token: string;
};
