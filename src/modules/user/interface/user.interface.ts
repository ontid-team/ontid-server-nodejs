import { Role } from '@utils/index';

export interface IUser {
  email: string;
  isNotifyEmail: boolean;
  isConfirmedEmail: boolean;
  isActive: boolean;
  role: Role;
}
